var db = require('seraph')();
var Comment = require('seraph-model')(db, 'Comment');

Comment.setUniqueKey('id');
Comment.schema = {
};

module.exports = Comment;

