var db = require('seraph')();
var Comment = require('seraph-model')(db, 'Comment');

Comment.schema = {
  text: { type: String, required: true, trim: true },
  post_id: Number
};
Comment.fields = Object.keys(Comment.schema);
Comment.useTimestamps();

module.exports = Comment;

