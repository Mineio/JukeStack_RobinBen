const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "jukBeRo",
  host: "i-kf.ch",
  password: "?_5yXhPs",
  database: "jukeStack_BenRobin",
});

app.post("/register", (req, res) => {
  const Surname = req.body.Surname;
  const Name = req.body.Name;
  const Email = req.body.Email;
  const Password = req.body.Password;
  const UserID = null;

  db.query(
    "INSERT INTO TUsers (UserID,UserVorname,UserNachname,UserEmail,UserPassword) VALUES(?,?,?,?,?)",
    [UserID, Surname, Name, Email, Password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM TUsers", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/login", (req, res) => {
  /*const Surname = req.body.Surname;
  const Name = req.body.Name;*/
  const Email = req.body.Email;
  const Password = req.body.Password;

  db.query(
    "SELECT * FROM TUsers WHERE UserEmail = ? AND UserPassword = ?",
    [Email, Password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Falsche Anmeldedaten" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running");
});
