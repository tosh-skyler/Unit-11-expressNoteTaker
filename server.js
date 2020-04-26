var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public/"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/app/notes", function (req,res) {
  res.sendFile(path.join(__dirname, '/db/db.json'));
})

app.post('/api/notes', (req, res) => {

});

app.delete('api/notes/:id', (req, res) => {

});

function writeToDB (data) {

};

app.listen(PORT, function () {
  console.log("App listening on: http://localhost:" + PORT);
});
