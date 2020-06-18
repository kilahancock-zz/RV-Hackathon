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

//add a new user to the DB (only do this after checking for existing user).
app.get("/newUser/:message", (req, res) => {
    let parameters = req.params.message.split("+");
    let queryStr = 'INSERT INTO Test_Table(firstName, lastName, email, passphrase,' +
        ' food, creative, entertainment, workout)' +
        " VALUES(" + "'" + parameters[0] + "', '" + parameters[1] +
        "', '" + parameters[2] + "', '" + parameters[3] + "', 0, 0, 0, 0);";
    console.log(queryStr);
    db.query(queryStr, (err, results) => {
        if(err){
            console.error(err);
            res.status(500)
        }
        console.log(results);
        res.send(results);
    });
});

//check to see if a user currently exists in the DB
app.get("/existUser/:message", (req, res) => {
    let email = req.params.message;
    let queryStr = "SELECT * FROM Test_Table WHERE email='" + email + "';";
    console.log(queryStr);
    db.query(queryStr, (err, results) => {
        if(err){
            console.error(err);
            res.status(500)
        }
        console.log(results);
        res.send(results);
    });
});

//Tries to login a user and returns their stored personal info.
app.get("/loginUser/:message", (req, res) => {
    let parameters = req.params.message.split("+");
    let email = parameters[0];
    let password = parameters[1];
    let queryStr = "SELECT * FROM Test_Table WHERE email='" + email + "' AND passphrase='" + password + "';";
    console.log(queryStr);
    db.query(queryStr, (err, results) => {
        if(err){
            console.error(err);
            res.status(500)
        }
        console.log(results);
        res.send(results);
    });
});

/**
 * Makes a call to the outlook API and sends the data to an endpoint
 */
app.get("/getOutlookData", (req, res) => {
  let accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImthSzNpbng4UXhsNEZkV3pfc2E3UFZXdWFiVC0yNnEzY1ZuZ1hNZ1hNb28iLCJhbGciOiJSUzI1NiIsIng1dCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSIsImtpZCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEvIiwiaWF0IjoxNTkyNDk3NDA4LCJuYmYiOjE1OTI0OTc0MDgsImV4cCI6MTU5MjUwMTMwOCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhQQUFBQVIzSXNpaU5yblcrMVFzMDZ4ZEVVQzkxWUNmQVNBbXgrbnRrSHdhWDY0UG9jcjQ4Z1BxSmtCWDc4dVlHSW1oZkpSZGxGTjNBVDhpUUdUWXY4TUhzTnBTQVo1aFZGalQxM1RpeDhhYTg5WHhJPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggZXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQmVubmV0dCIsImdpdmVuX25hbWUiOiJNYXR0aGV3IiwiaXBhZGRyIjoiMjQuMTQ4LjIyMC41IiwibmFtZSI6Ik1hdHRoZXcgQmVubmV0dCIsIm9pZCI6Ijg2NzYwNmJjLWFmZmYtNGY2Mi05NTBlLTlmNWU1NWViMDU5MSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS02ODIwMDMzMzAtMTk3OTc5MjY4My03MjUzNDU1NDMtMTM4NTkzIiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAwQzA0ODcwQTIiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZFdyaXRlIENvbnRhY3RzLlJlYWRXcml0ZSBGaWxlcy5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZFdyaXRlIE5vdGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIFBlb3BsZS5SZWFkIHByb2ZpbGUgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWRXcml0ZSBlbWFpbCIsInN1YiI6ImxiQVVIN052Z3dGQ08zZGhKVWhaRDc1c3JDX1owUk1EbHpjb09HbTVDVGsiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiI0Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEiLCJ1bmlxdWVfbmFtZSI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInVwbiI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInV0aSI6ImYxUVhTX244LUVXYzcxY2huazhIQVEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiTGhoMEZ0NVFYNTlCY0JKSlJwUlNyN2Q5WDJqWUNCTzRHaU1nSTlJZFVFRSJ9LCJ4bXNfdGNkdCI6MTQxOTM1NzExMH0.IgaCzRjU8aLRNycPmVSQDPyttHZfmUscUl1xvbVBv3J_8vP1_uOHt_aewOsy90nPdZZUIPXe4C_HiBGJw3uTk3Jc_TRZSEK6HxAfDv3Flno58Av24S_y6r2LQiwEFjwh2K7idelyaPH482lJEXNa9VDrVUFqXo8kD8b9FB1EkT8WXyJS69DTtY2nIz6Egk2GPLXvjcCS_KCbdQoex8FF2Y7w--0IquhmHCo1VM6ypJs6LBixu0bgxfsEmz-I6-MwUXw1K2V7TGpNMPNDuy8AIYy32WKrIe840G5Mmh_uH-bTKEjcVpHIk9zGC4lH8zVNlyVQAP54d65zEVlPH3_zBA";
  var d = new Date();

  //Get the current date in the right format for outlook API
  let currentDate = d.getFullYear() + "-";
  currentDate = ("" + d.getMonth()).length == 1 ? currentDate + "0" + (d.getMonth() + 1) + "-" : currentDate + (d.getMonth() + 1) + "-";
  currentDate = ("" + d.getDate()).length == 1 ? currentDate + "0" + d.getDate() : currentDate + d.getDate();

  //Create the query string such that we are getting the events for the day.
  let dateEndTime = "enddatetime=" + currentDate + "T20:00:00.000Z";
  let dateStartTime = "startdatetime=" + currentDate + "T06:00:00.000Z";
  let queryString = "calendarview?" + dateStartTime + "&" + dateEndTime;

  //calendarview?startdatetime=2020-06-17T20:07:32.766Z
  //enddatetime=2020-06-24T20:07:32.766Z
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
