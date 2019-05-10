const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    content: String
})

module.exports = model("Comment", CommentSchema);