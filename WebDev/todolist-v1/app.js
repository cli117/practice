//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  var day = date.getDate();
  // var daysDict = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // res.render('list', {dayName: daysDict[today.getDay()]});
  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

app.get("/work", function(req, res) {
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res){
  res.render('about');
});

app.post("/", function(req, res) {
  if (req.body.list === "Work") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
    return;
  }
  items.push(req.body.newItem);
  res.redirect("/");
});

app.post("/work", function(req, res) {
  workItems.push(req.body.newItem);
  res.redirect("/work");
});

app.listen(3000, function() {
  console.log("Server started on port 3000")
});
