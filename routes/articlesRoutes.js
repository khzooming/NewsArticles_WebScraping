const router = require("express").Router();
const { getAll, scrape } = require('../controllers/articlesController');
// Retrieve data from the db
router.get("/all", getAll);

// Scrape data from one site and place it into the mongodb db
router.get("/scrape", scrape);


module.exports = router;

