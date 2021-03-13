const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { CLIENT_RENEG_WINDOW } = require("tls");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.city;
    const appKey = "623585d07ac59a2e47002e44b2484fba";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + units;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            console.log(icon);
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(description);
            console.log(temperature);
            res.write("<h1>The temperature in " + query + " is " + temperature + "^C</h1><h2>with " + description + "</h2>")
            res.write('<img src="' + iconURL + '">');
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server is hosted on port 3000.");
})
