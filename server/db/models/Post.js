var db = require('seraph')();
var Post = require('seraph-model')(db, 'Post');

Post.setUniqueKey('id');
Post.schema = {
};

module.exports = Post;
