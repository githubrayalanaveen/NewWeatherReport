require('dotenv').config();
const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function (req,res){
// res.sendFile(__dirname + "/index.html")
res.render("index");
});

app.post("/", function(req,res){

  var locationWeather = req.body.cityName;
  var apiKey = process.env.API_KEY;
  //"bcc2378ef26407658ef8fade36457c43";
  var locationMetric = "metric"
  // Below is the get from external
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q="+ locationWeather +"&units=" + locationMetric
  https.get(url, function(response) {
    const successCode = response.statusCode;
    //   console.log(response.statusCode);
    response.on("data", function(data){

      // res.write("<p>The Weather description is " + weatherDescription + ".</p>");
      // res.write("<h2>The Temp in " + locationWeather + " is " + temp + " Degrees Celsius.</h2>");
      // res.write ("<img src=" + imagePath + ">");
      // res.send();
    if (successCode === 200) {
      console.log("Success");
      // *********************************

        // console.log(data);
        var weatherData = JSON.parse(data);
        // console.log(weatherData);
        var temp = weatherData.main.temp;
        var weatherDescription = weatherData.weather[0].description;
        console.log(temp);
        console.log(weatherDescription);
        const icon = weatherData.weather[0].icon;

        console.log(icon);
        const imagePath = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // **************************************
      res.render("report", {weatherDescription: weatherDescription, temp: temp, locationWeather: locationWeather, imagePath: imagePath});
    } else {
    res.render("failure");
    }

    });
  })
})



app.listen(3000, function() {
  console.log ("server is running on port 3000");
})
