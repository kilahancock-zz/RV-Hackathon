const express = require("express");
const process = require("process");
const mysql = require("mysql");
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

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
