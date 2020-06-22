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

//check to see if a user currently exists in the DB.
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

//Updates a user's unique category counters.
app.get("/updateUser/:message", (req, res) => {
    let parameters = req.params.message.split("+");
    let personId = parameters[0];
    let section = parseInt(parameters[1]);
    let additional = parameters[2];
    let sectionName = "";
    switch (section) {
        case 0:
            sectionName = "creative";
            break;
        case 1:
            sectionName = "food";
            break;
        case 2:
            sectionName = "entertainment";
            break;
        case 3:
            sectionName = "workout";
            break;
        default:
            sectionName = "oh no things have gone bad.";
            break;
    }
    let queryStr = "UPDATE Test_Table SET " + sectionName + " = " + sectionName + " + " + additional + " WHERE " + "id = " + personId + ";";
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
  let accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IjBOUEhJYXp6eFEyZDJpZlNacjkzRUU1OGE5RnpXYl9OaEZOcnVyclJMVEkiLCJhbGciOiJSUzI1NiIsIng1dCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSIsImtpZCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEvIiwiaWF0IjoxNTkyODMzMDkzLCJuYmYiOjE1OTI4MzMwOTMsImV4cCI6MTU5MjgzNjk5MywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhQQUFBQWJLbVdmcExlOXdwWDJpV0dkcUtScnBBSU1YTkNCQS85WGFqdzhGNlNSOUFGNFRlU2k4Wi9tdEc4S1dzNkhwQU45dEZyNXpxOFNWRGc4WS8zdGxnWUkvc2s3WjRFaGFvZWtEdHpiUzI0R3hjPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggZXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQmVubmV0dCIsImdpdmVuX25hbWUiOiJNYXR0aGV3IiwiaXBhZGRyIjoiMjA5LjI1MS4yMzguNTIiLCJuYW1lIjoiTWF0dGhldyBCZW5uZXR0Iiwib2lkIjoiODY3NjA2YmMtYWZmZi00ZjYyLTk1MGUtOWY1ZTU1ZWIwNTkxIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTY4MjAwMzMzMC0xOTc5NzkyNjgzLTcyNTM0NTU0My0xMzg1OTMiLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzIwMDBDMDQ4NzBBMiIsInNjcCI6IkNhbGVuZGFycy5SZWFkV3JpdGUgQ29udGFjdHMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgTWFpbC5SZWFkV3JpdGUgTm90ZXMuUmVhZFdyaXRlLkFsbCBvcGVuaWQgUGVvcGxlLlJlYWQgcHJvZmlsZSBTaXRlcy5SZWFkV3JpdGUuQWxsIFRhc2tzLlJlYWRXcml0ZSBVc2VyLlJlYWQgVXNlci5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImlua25vd25udHdrIl0sInN1YiI6ImxiQVVIN052Z3dGQ08zZGhKVWhaRDc1c3JDX1owUk1EbHpjb09HbTVDVGsiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiI0Mjg5ZDYxMC0yY2ZkLTQ2MjEtOGM5Ni00NGExNTE4ZGRiMGEiLCJ1bmlxdWVfbmFtZSI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInVwbiI6Im1iZW5uZXR0QHJlZHZlbnR1cmVzLmNvbSIsInV0aSI6InFnLTg0T2FfVGtXMDVBLUhMM1I1QUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiTGhoMEZ0NVFYNTlCY0JKSlJwUlNyN2Q5WDJqWUNCTzRHaU1nSTlJZFVFRSJ9LCJ4bXNfdGNkdCI6MTQxOTM1NzExMH0.NGMbRycMtA6jR-nP5jv-PSKDWsLJCPS00zRzsFb103di8FTN_ZrL_INBOI9dT0PAZvYuOT8JwDcfmTPkWn_Zzj_uKVAPzWz7-zZHBflXctdunfblhi5ShxNlXjdR1Tri7kIiT6qdbzkDsANTXCI2morAb5dt93JIn9tFAzpPZKjwNIDImPvWprtjgK67zpvsiKEr06QSis4EKs_9LZ_r8xSGsz6QTVjQLfEP6vW8RV8aOemDJw74lSFuxNtWWFdg0dK_CjgcuBXFWU-K2Y54rqjB0sKO_G382f0ugKYvcTcea6zFMVBv1yG7F3ajK6JkgHHKjAfGij4ZZmLdsUxG3g";
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
