const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function()
{
  console.log("Server started listening to port");
});

app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res)
{
  console.log(req.body.firstname);
  console.log(req.body.lastname);
  console.log(req.body.email);
});


// api key: 11f0ccd9704391a81fe0b828e61120f4-us14
