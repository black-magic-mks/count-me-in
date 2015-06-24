var db = require('seraph')();
var Comment = require('seraph-model')(db, 'Comment');

Comment.schema = {
  text: { type: String, required: true, trim: true }
};
Comment.fields = Object.keys(Comment.schema);

module.exports = Comment;

