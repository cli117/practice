//jshint esversion:6

const express = require("express");

const app = express();

app.get("/", function(req, resp)
{
  resp.send("hello");
});

app.get("/contact", function(req, resp)
{
  resp.send("tele: xxxxxxxx");
});

app.get("/about", function(req, resp)
{
  resp.send("I am your daddy :)");
});


app.listen(3000, function()
{
  console.log("Server started on port 3000");
});
