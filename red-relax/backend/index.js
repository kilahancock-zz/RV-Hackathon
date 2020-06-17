const express = require("express");
const process = require("process");
const mysql = require("mysql");
const cors = require("cors");

const app = new express();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'testDB',
});

// Allow cors
app.use(cors())

app.get("/echo/:message", (req, res) => {
  db.query('SELECT ? as result', [req.params.message],
    (err, results) => {
      if(err){
        console.error(err)
        res.status(500)
      }
      res.send(results[0].result);
    }
  );
});

app.get("/meta", (req, res) => {
    db.query('describe Test_Table', (err, results) => {
        if(err){
            console.error(err)
            res.status(500)
          }
        res.send(results)
    })
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
