var db = require('seraph')();
var Post = require('seraph-model')(db, 'Post');

Post.schema = {
  title: {type: String, required: true},
  aws_url: String,
  text: {type: String, trim: true}
};
Post.fields = Object.keys(Post.schema);
Post.useTimestamps();
module.exports = Post;
