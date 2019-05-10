var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var expressHandlebars = require("express-handlebars");
var articleRoutes = require('./routes/articlesRoutes');
var commentRoutes = require('./routes/commentsRoutes');

var PORT = process.env.port || 3000;

// if deployed, use the deployed database. 
// Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/mongoHeadlines', { useNewURLParser: true });

// Database config
var databaseURL = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseURL, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

var dbase = require("./models");

// initialize Express
var app = express();

// middleware

// morgan logger for logging requests
app.use(logger("dev"));

// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public a static folder
app.use(express.static("public"));

// connect hanldebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars");
// set up bodyparser
// app.use(bodyParser.urlencoded({
//     extended: false
// }));

app.use('/articles', articleRoutes);
app.use('/comments', commentRoutes);
// app.use('/products', productsRoutes);

app.get('/*', function (req, res, next) {
    res.render('home', {
        showTitle: true,
    });
});



// Listen on port 3000
app.listen(PORT, function () {
    console.log("App running on port 3000!");
});
