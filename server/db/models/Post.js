var db = require('seraph')();
var Post = require('seraph-model')(db, 'Post');

Post.schema = {
  text: { type: String, required: true, trim: true },
  aws_url: { type: String },
  title: { type: String, required: true, trim: true }
};
Post.fields = Object.keys(Post.schema);
Post.useTimestamps();

module.exports = Post;
