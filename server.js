const express = require("express");
const uniqid = require("uniqid");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.post('/api/notes', (req, res) => {
  const apiPost = req.body;
  req.body.id = uniqid();

  fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
    let json = JSON.parse(data);

    json.push(apiPost);

    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(json), err => {
      if (err) throw err;
      console.log('Added note to notes!');
    });
  });

  res.send('DB has been modified.');
});

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
    let json = JSON.parse(data);

    let newJson = json.filter(item => {
      return item.id !== req.params.id;
    });

    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(newJson), err => {
      if (err) throw err;
      console.log('Deleted note from the database!');
    });

    res.send(`Deleted ${req.params.id}`);
  });
});

app.listen(PORT, function () {
  console.log("App listening on: http://localhost:" + PORT);
});
