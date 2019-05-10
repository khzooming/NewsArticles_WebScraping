var router = require('express').Router();
var { getOne } = require('./../controllers/commentsController');

router.get('/:id', getOne);

module.exports = router;