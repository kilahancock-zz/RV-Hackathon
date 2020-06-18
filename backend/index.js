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



app.get("/getOutlookData", (req, res) => {
  let accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6Ild0bl9zbDM1TW9Tal9lSDN6bkpsM0dSZ0VnVGFER1J4OE9ORHZUMWtQNEkiLCJhbGciOiJSUzI1NiIsIng1dCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSIsImtpZCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEvIiwiaWF0IjoxNTkyNDg3NTYzLCJuYmYiOjE1OTI0ODc1NjMsImV4cCI6MTU5MjQ5MTQ2MywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhQQUFBQUtlWXNwSytleFBURTZURUZ2djQwb2hLSFRFdWFYb2NmK3p6TTRxZDN2S1V5VHhSQ3BoN0ZRQVI2dVF6SVc3a1J2ejRKTzFsZUwxSWNLVStCeWR1blJRSXpYMVFDUFVzUFNrR3ZrSEVXZzNrPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggZXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQmVubmV0dCIsImdpdmVuX25hbWUiOiJNYXR0aGV3IiwiaXBhZGRyIjoiMjQuMTQ4LjIyMC41IiwibmFtZSI6Ik1hdHRoZXcgQmVubmV0dCIsIm9pZCI6Ijg2NzYwNmJjLWFmZmYtNGY2Mi05NTBlLTlmNWU1NWViMDU5MSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS02ODIwMDMzMzAtMTk3OTc5MjY4My03MjUzNDU1NDMtMTM4NTkzIiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAwQzA0ODcwQTIiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZFdyaXRlIENvbnRhY3RzLlJlYWRXcml0ZSBGaWxlcy5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZFdyaXRlIE5vdGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIFBlb3BsZS5SZWFkIHByb2ZpbGUgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWRXcml0ZSBlbWFpbCIsInN1YiI6ImxiQVVIN052Z3dGQ08zZGhKVWhaRDc1c3JDX1owUk1EbHpjb09HbTVDVGsiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiI0Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEiLCJ1bmlxdWVfbmFtZSI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInVwbiI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInV0aSI6IlN3QjhnclhsNFVlRkw4aUVQYm4yQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiTGhoMEZ0NVFYNTlCY0JKSlJwUlNyN2Q5WDJqWUNCTzRHaU1nSTlJZFVFRSJ9LCJ4bXNfdGNkdCI6MTQxOTM1NzExMH0.iNT70RGE1IyexnxPi76B8GVqvYRjw2jdvJyIXZEr-WTBUaT82bTFOGZaevzs-2O_Ivjkw3LK5Nlz1ln0_zbZoISVEypz5uoO6GkUEOxmojqqfnUxHWTQDCZ9zI0LIX5LfELaKL-SSomz0FLN46gq4KprC42F9jCjvRMTJTPQCfID6TXC8A_DVpcuk21N2zR5GLmjc2P_Q0612KevQ6ih_YJti0HffseyyqhnnMiQ7PfW9i6v0dAIe7f4GL7nnYpvX0xXTm98XxdNDHSJln3h8PK8okcZIcnUBj_nhE9nB8EHEyfC6N4m0xvtYHdo2eY5Gdi-1TJ_4Y2AW8dYSSx7-w";
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
    //console.log("Results: ");
    //console.log(body);
    results = body;
  });

  res.send(results);
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
