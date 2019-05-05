var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// if deployed, use the deployed database. 
// Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/mongoHeadlines', { useNewURLParser: true });

var db = require("./models");

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






