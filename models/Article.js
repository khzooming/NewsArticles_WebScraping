var mongoose = require("mongoose");
var validate = require('mongoose-validator')

var newsURL = new mongoose.Schema({
    downloadURL: {
        type: String,
        unique: true
    }
});

newsURL.path('downloadURL').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

// save reference to Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,
        trim: true
    },

    summary: {
        type: String
    },

    url: {
        url: newsURL
    }
});

// create model from ArticleSchema, using mongoose model method
var Article = mongoose.model("Article", ArticleSchema);

// export Article model
module.exports = Article;
