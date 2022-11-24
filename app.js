const fs = require("fs"); //file system package
const path = require("path"); //path absolute built-in package

const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views")); // let express know where to find the html files
app.set("view engine", "ejs"); //template engine EJS installed with npm install ejs

app.use(express.static("public")); //this sets up a request handler that will be executed on each incoming request that simply checks if this is a request for a statis file
app.use(express.urlencoded({ extendend: false })); //access form and store in file

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index"); //render a template, parse a template file with help of template engine and convert to html to send back to the browser
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body; //store data as a whole //have acces from above, export the entire form body
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath); //read the content from json
  const storedRestaurants = JSON.parse(fileData); //text to translate this into a JavaScript array with JSON.parse on the raw fileData

  storedRestaurants.push(restaurant); //push the new restaurant into the array from the req.body

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); //store data, converted back from JavaScript array to text

  res.redirect("/confirm");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath); //read the content from json
  const storedRestaurants = JSON.parse(fileData); //text to translate this into a JavaScript array with JSON.parse on the raw fileData

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length, //number of elements from the array of restaurants
    restaurants: storedRestaurants, //output restaurants from the array
  });
});

app.listen(3000);
