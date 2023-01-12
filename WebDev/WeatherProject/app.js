const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res)
{
  const query = req.body.cityName;
  const apikey = "01596c2325e8b92c5010d9b9c5a38740";
  const units = "metric";
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + desc + "<p>");
      res.write("<h1> The temperature in "+ query +" is " + weatherData.main.temp + " degrees Celcius </h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("The server is now running on port 3000!");
});
