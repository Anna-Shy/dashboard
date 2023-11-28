import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1000",
  database: "mydb"
});

const handleDatabaseQuery = (tableName, res) => {
  db.query(`SELECT * FROM ${tableName}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
};

app.get("/userinfo", (req, res) => {
  handleDatabaseQuery("userinfo", res);
});

app.get("/mistake", (req, res) => {
  handleDatabaseQuery("mistake", res);
});

app.get("/meeting", (req, res) => {
  handleDatabaseQuery("meeting", res);
});



app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
