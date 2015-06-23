var db = require('seraph')();
var Post = require('seraph-model')(db, 'Post');

Post.schema = {
  text: { type: String, required: true, trim: true }
};

Post.fields = Object.keys(Post.schema);

module.exports = Post;
