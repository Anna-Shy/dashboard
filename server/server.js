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

app.get("/userinfo", (req, res) => {
  db.query("SELECT * FROM userinfo", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/mistake", (req, res) => {
  db.query("SELECT * FROM mistake", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/meeting", (req, res) => {
  db.query("SELECT * FROM meeting", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const mail = req.body.mail;
  const descript = req.body.descript;

  db.query(
    "INSERT INTO user (name, mail, descript) VALUES (?,?,?)",
    [name, mail, descript],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  db.query(
    "UPDATE user SET name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});


// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';

// const app = express();
// const PORT = 3000;

// // Подключение к MongoDB
// mongoose.connect('mongodb://localhost:27017/ваша_база_данных', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Создание схемы для данных
// const dataSchema = new mongoose.Schema({
//   value: String
// });

// // Создание модели
// const Data = mongoose.model('Data', dataSchema);

// // Использование bodyParser для обработки данных в формате JSON
// app.use(bodyParser.json());

// // Отправка HTML страницы с формой
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // Обработка POST запроса с данными из инпута
// app.post('/addData', async (req, res) => {
//   const { value } = req.body;

//   try {
//     // Создание новой записи в базе данных
//     const newData = new Data({ value });
//     await newData.save();

//     res.status(201).send('Данные успешно добавлены в базу данных');
//   } catch (error) {
//     res.status(500).send('Произошла ошибка при добавлении данных в базу данных');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });
