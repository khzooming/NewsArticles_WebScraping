var { Article } = require('../models');
const axios = require('axios');
const cheerio = require('cheerio')

function getAll(req, res) {
    // Find all results from the scrapedData collection in the db
    Article.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
}

function scrape(req, res) {
    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://www.npr.org///").then(function (response) {
        // Load the html body from axios into cheerio
        var $ = cheerio.load(response.data);
        // For each element with a "title" class
        // story-text
        $("div.story-text").each(function (i, element) {
            // Save the headline and href of each link enclosed in the current element
            var headline = $(element).children("a").text();
            var url = $(element).children("a").attr("href");

            console.log(headline);
            console.log(url);
            // If this found element had both a title and a link
            if (headline && url) {
                // Insert the data in the scrapedData db
                db.scrapedData.insert({
                    headline: headline,
                    url: url
                },
                    function (err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        }
                        else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                        }
                    });
            }
        });
    });
    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
}



module.exports = {
    getAll,
    scrape
}