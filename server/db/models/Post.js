var db = require('seraph')();
var Post = require('seraph-model')(db, 'Post');

Post.schema = {
  user: String,
  image: String,
  text: {type: String, trim: true},
  date: Date
};
Post.fields = Object.keys(Post.schema);

module.exports = Post;
