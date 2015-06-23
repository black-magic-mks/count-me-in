var db = require('seraph')();
var Comment = require('seraph-model')(db, 'Comment');

module.exports = Comment;

