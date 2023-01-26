const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "http://localhost:3000/main.js "));

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
app.get("/actual", (req, res) => {
  const SongID2 = req.query.SongID2;
  const SongID3 = req.query.SongID3;
  const SongID4 = req.query.SongID4;
  const SongID5 = req.query.SongID5;
  const SongID6 = req.query.SongID6;

  db.query(
    "SELECT * FROM TNFTSongs WHERE SongID IN (?,?,?,?,?)",
    [SongID2, SongID3, SongID4, SongID5, SongID6],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/borrows", (req, res) => {
  const UserID = req.query.UserID;
  //console.log(UserID);
  db.query(
    "SELECT * FROM TAusgelieheneSongs WHERE UserID = ?",
    [UserID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        //console.log(result);
      }
    }
  );
});
app.post("/ausleihen", (req, res) => {
  const AuslTime = req.body.AuslTime;
  const UserID = req.body.UserID;
  userID = UserID;
  const SongID = req.body.SongID;
  db.query(
    "INSERT INTO TAusgelieheneSongs (AuslTime,UserID,SongID) VALUES(?,?,?)",
    [AuslTime, UserID, SongID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/songs", (req, res) => {
  db.query(
    "SELECT * FROM TNFTSongs WHERE SongID NOT IN (SELECT SongID FROM TAusgelieheneSongs)",
    (err, result) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

let email;
app.get("/userdata", (req, res) => {
  db.query(
    "SELECT * FROM TUsers WHERE UserEmail = ?",
    [email],
    (err, result) => {
      //res.header("Access-Control-Allow-Origin", "*");
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/delete", (req, res) => {
  const id = req.query.id;
  db.query(
    "DELETE FROM TAusgelieheneSongs WHERE SongID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values deleted");
      }
    }
  );
});
app.post("/login", (req, res) => {
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
        email = Email;
      } else {
        res.send({ message: "Falsche Anmeldedaten" });
      }
    }
  );
});
let userID;
app.get("/usersongs", (req, res) => {
  db.query(
    "SELECT SongID FROM TAusgelieheneSongs WHERE UserID = ?",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/getSongIDs", (req, res) => {
  const UserID = req.query.UserID;
  db.query(
    "SELECT * FROM TNFTSongs WHERE SongID IN (SELECT SongID FROM TAusgelieheneSongs WHERE UserID = ?)",
    [UserID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getUsers", (req, res) => {
  db.query("SELECT * FROM TUsers", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running");
});
