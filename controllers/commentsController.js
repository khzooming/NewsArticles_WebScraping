const { Comment } = require('../models');

function getOne(req, res) {
    Comment.findOne(req.params).then(comment => {
        res.json(comment);
    }).catch(err => {
        if (err) throw err;
    })
}

module.exports = {
    getOne
}