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



app.get("/outlookRequest", (req, res) => {
  let accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkpqOUJ6bk1hVmZkY1UwRG0xTFpUOGMwZWpObERPS204eHlLTHVudjJLT28iLCJhbGciOiJSUzI1NiIsIng1dCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSIsImtpZCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEvIiwiaWF0IjoxNTkyNDI0MTMwLCJuYmYiOjE1OTI0MjQxMzAsImV4cCI6MTU5MjQyODAzMCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhQQUFBQWRmTFJHTkN3YmZnbFVySGlzWkQ5VjdBck5UMk15NHUyQ3hjT0ZqSmJTWnluamRXZHdCUk9VTlFRTFZwMkZRTFZ6UWRMc0lsMWhxTHdjUHVlTlQvTnFJOG8xS2NIN0xuRkxpVlAyMTVzb2JFPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggZXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQmVubmV0dCIsImdpdmVuX25hbWUiOiJNYXR0aGV3IiwiaXBhZGRyIjoiMjQuMTQ4LjIyMC41IiwibmFtZSI6Ik1hdHRoZXcgQmVubmV0dCIsIm9pZCI6Ijg2NzYwNmJjLWFmZmYtNGY2Mi05NTBlLTlmNWU1NWViMDU5MSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS02ODIwMDMzMzAtMTk3OTc5MjY4My03MjUzNDU1NDMtMTM4NTkzIiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAwQzA0ODcwQTIiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZFdyaXRlIENvbnRhY3RzLlJlYWRXcml0ZSBGaWxlcy5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZFdyaXRlIE5vdGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIFBlb3BsZS5SZWFkIHByb2ZpbGUgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWRXcml0ZSBlbWFpbCIsInN1YiI6ImxiQVVIN052Z3dGQ08zZGhKVWhaRDc1c3JDX1owUk1EbHpjb09HbTVDVGsiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiI0Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEiLCJ1bmlxdWVfbmFtZSI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInVwbiI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInV0aSI6IlhGNklQVE42Smt5SDFyNE1KMzdnQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiTGhoMEZ0NVFYNTlCY0JKSlJwUlNyN2Q5WDJqWUNCTzRHaU1nSTlJZFVFRSJ9LCJ4bXNfdGNkdCI6MTQxOTM1NzExMH0.WR9dNcSxWtQzPLUye6apmkpFGd_2pBiAxVqZJSLhZGuYCkBRTRnQIvo53hwlIie3iOt17R0qSx6_CKkBGC7jZl0CwGetNGwzpbTxoNAOBHYzSDUHzxTygVTVnxgumI3nMGSx2vBs6lzWVedSje6x_XFHamwpsI6Ijgt8w-oKff1Hcl7aZpGFBSKI8-8Q2ylKuFGDuHoDaZG7toFUA4Ax-eroMl0kUCKKrcBkdb9R9CVRLykUmER8Um44kXcrNjUgmDSN2dYPrGbIsFmIkdVCXlTIxfbNR-wnrx05UZndurpKjLJjd_4o5QzOqPOkddA0yysqCZjdTjUbHcF36TwYFA";
  let results = "";

  //startdatetime=2020-06-17T20:07:32.766Z
  //enddatetime=2020-06-24T20:07:32.766Z
  //events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location

  var options = {
    url: "https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=2020-06-17T20:07:32.766Z&enddatetime=2020-06-24T20:07:32.766Z",
    method: 'GET',
    json: true,
    headers: {
      Accept: "application/json;odata.metadata=minimal;odata.streaming=true",
        'Authorization': "Bearer " + accessToken
    }
  }

  request(options, function(err, res, body) {
    console.log("Results:");
    console.log(body);
//    let json = JSON.parse(body);
    results = body;
  });

  res.send(results);

})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
