const express = require("express");
const process = require("process");
const mysql = require("mysql");
const request = require('request');
const cors = require("cors");

const app = new express();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'testDB'
});

// Allow cors
app.use(cors());

//debugging purposes.
app.get("/echo/:message", (req, res) => {
  console.log("hello");
  db.query('SELECT ? as result', [req.params.message],
    (err, results) => {
      if(err){
        console.error(err);
        res.status(500)
      }
      res.send(results[0].result);
    }
  );
});

//this is used to pull all available columns in the table, debugging purposes.
app.get("/meta", (req, res) => {
    db.query('SELECT * FROM INFORMATION_SCHEMA.COLUMNS where TABLE_NAME="Test_Table";', (err, results) => {
        if(err){
            console.error(err);
            res.status(500)
          }
        res.send(results)
    })
});

//front end sends new user params to this endpoint, joined by "+".
//split the params, and INSERT new user based on all params provided.
//return whether or not it was successful.
app.get("/newUser/:message", (req, res) => {
    let parameters = req.params.message.split("+");
    let queryStr = 'INSERT INTO Test_Table(firstName, lastName, email, passphrase)' +
        " VALUES(" + "'" + parameters[0] + "', '" + parameters[1] +
        "', '" + parameters[2] + "', '" + parameters[3] + "');";
    console.log(queryStr);
    db.query(queryStr, (err, results) => {
        if(err){
            console.error(err);
            res.status(500)
        }
        console.log(results);
    });
});

/**
 * Makes a call to the outlook API and sends the data to an endpoint
 */
app.get("/getOutlookData", (req, res) => {
  let accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlFWTWVIU0FaUEU3a29EWFBoODRFWE9JWkRkZGY2dlpETFkycHg2VEJkSjgiLCJhbGciOiJSUzI1NiIsIng1dCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSIsImtpZCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEvIiwiaWF0IjoxNTkyNTY3NzQ3LCJuYmYiOjE1OTI1Njc3NDcsImV4cCI6MTU5MjU3MTY0NywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhQQUFBQXJzQjREOE50YUxIY2F2d243L2VTaDkvbWptMmw5WHVFMFRHYk1NRHpGaE9OYy9KQ1dRZ012VGVzT2xNMnIyakhiZjJQWVdnQitObGxRZys1RVYxYm9EMlMwZXNHbnltaHhZNUp6bDIwUGd3PSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggZXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQmVubmV0dCIsImdpdmVuX25hbWUiOiJNYXR0aGV3IiwiaXBhZGRyIjoiMjQuMTQ4LjIyMC41IiwibmFtZSI6Ik1hdHRoZXcgQmVubmV0dCIsIm9pZCI6Ijg2NzYwNmJjLWFmZmYtNGY2Mi05NTBlLTlmNWU1NWViMDU5MSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS02ODIwMDMzMzAtMTk3OTc5MjY4My03MjUzNDU1NDMtMTM4NTkzIiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAwQzA0ODcwQTIiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZFdyaXRlIENvbnRhY3RzLlJlYWRXcml0ZSBGaWxlcy5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZFdyaXRlIE5vdGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIFBlb3BsZS5SZWFkIHByb2ZpbGUgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWRXcml0ZSBlbWFpbCIsInN1YiI6ImxiQVVIN052Z3dGQ08zZGhKVWhaRDc1c3JDX1owUk1EbHpjb09HbTVDVGsiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiI0Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEiLCJ1bmlxdWVfbmFtZSI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInVwbiI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInV0aSI6InRzTUZ0WC01ZFVTRlBYN19EUzA1QVEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiTGhoMEZ0NVFYNTlCY0JKSlJwUlNyN2Q5WDJqWUNCTzRHaU1nSTlJZFVFRSJ9LCJ4bXNfdGNkdCI6MTQxOTM1NzExMH0.DmeO4D1oOeRpZAkkis-7UYHPgURkQei1aEjpqoSRb43_IGa3FsxRsm3fgb9C-qf5ZPEiZ40HQbTeYpiWhueaG9CGNTuRgVCXwktYPVNtZFlzuK0BrUigP5YYiKBsE_DrYXLFJsYL67igXld0WfWLocL6IFL9aqA75O19CO8iCyHsGz7Dgj90mIV5hGgZ4CRtyoY6T92RraKPt5fd_bHyJaKghDhnzMBblcLjiwkIBpeNnyfAqRnbbRqAMISnd_Axw6nHFCyHQB1Us_8hsKDRVKHFsjF8AW1PzYFXcKQJbZDHdr0zUwLo2_LXnUuduHrQ_VcZKlEfbXlIp-bh7_eyuA";
  var d = new Date();

  //Get the current date in the right format for outlook API
  let currentDate = d.getFullYear() + "-";
  currentDate = ("" + d.getMonth()).length == 1 ? currentDate + "0" + (d.getMonth() + 1) + "-" : currentDate + (d.getMonth() + 1) + "-";
  currentDate = ("" + d.getDate()).length == 1 ? currentDate + "0" + d.getDate() : currentDate + d.getDate();

  //Create the query string such that we are getting the events for the day.
  let dateStartTime = "startdatetime=" + currentDate + "T08:00:00.000Z";
  let dateEndTime = "enddatetime=" + currentDate + "T18:00:00.000Z";
  let queryString = "calendarview?" + dateStartTime + "&" + dateEndTime;

  //calendarview?startdatetime=2020-06-18T08:00:00.000Z
  //enddatetime=2020-06-18T20:00:00.000Z
  //events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location

  var options = {
    url: "https://graph.microsoft.com/v1.0/me/" + queryString,
    method: 'GET',
    json: true,
    headers: {
      Accept: "application/json;odata.metadata=minimal;odata.streaming=true",
        'Authorization': "Bearer " + accessToken
    }
  }

  request(options, function(err, response, body) {
    res.send(body);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
