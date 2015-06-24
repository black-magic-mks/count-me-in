var db = require('seraph')();
var Post = require('seraph-model')(db, 'Post');

Post.schema = {
  title: {type: String, max: 30, min: 1, required: true},
  aws_url: String,
  text: {type: String, trim: true}
};
Post.fields = Object.keys(Post.schema);
Post.useTimestamps();
module.exports = Post;
