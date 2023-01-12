const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, resp)
{
  resp.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function(req, resp)
{
  resp.sendFile(__dirname + "/bmiCalculator.html")
});

app.post("/", function(req, resp)
{
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);

  var result = num1 + num2;

  resp.send("The result is " + result);
});

app.post("/bmicalculator", function(req, resp)
{
  var height_val = parseFloat(req.body.height);
  var weight_val = parseFloat(req.body.weight);

  var result = weight_val / (height_val * height_val);
  resp.send("Your BMI is " + result);
});

app.listen(3000, function()
{
  console.log("Server started on port 3000");
});
