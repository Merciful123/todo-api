import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// const port = 8000;
const port = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);
app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const db = mysql.createPool({
  // host: "localhost",
  // user: "root",
  // password: "Mysql@313",
  // database: "todo-test",
  host: "db-mysql-blr1-21952-do-user-15495642-0.c.db.ondigitalocean.com",
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
  acquireTimeout: 100000, // Adjust as needed
  waitForConnections: true,
});

// get all todo

app.get("/", (req, res) => {
  if (err) return res.json(err);
  return res.json("Connected Successfully");
})

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data)
  });
});

// create a todo

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`)  VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created succesfully");
  });
});

//  delete a todo

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted succesfully");
  });
});

//  update a todo

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?";

  const values = [req.body.title, req.body.desc, req.body.cover, bookId];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
