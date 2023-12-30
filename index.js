import express from "express"
import mysql from "mysql";
import cors from "cors";

const app = express()

const port = 8000

app.use(express.json())

app.use(cors())

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password: "Mysql@313",
    database: "todo-test",
    
})

// get all todo 

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";

    db.query(q,(err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// create a todo

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`)  VALUES (?)";
    const values = [req.body.title, req.body.desc,req.body.cover];
    
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created succesfully")
    })

})

//  delete a todo

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const query = "DELETE FROM books WHERE id = ?"

    db.query(query, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted succesfully");
    })
      
})


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



app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})