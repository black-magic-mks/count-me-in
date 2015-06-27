var db = require('seraph')();
var Post = require('seraph-model')(db, 'Post');
var Q = require('q');
var query = Q.nbind(db.query,db);

Post.schema = {
  title: {type: String, required: true},
  aws_url: String,
  text: {type: String, trim: true}
};

Post.addComputedField('likes', function(post, done) {
  query([
    'MATCH (u)-[:LIKED]->(p)',
    'WHERE id(p)={post}',
    'RETURN u'
  ].join(' '),
  {
    post: post.id
  })
  .then(function(users) {
    done(null,users.length);
  })
  .catch(function(err) {
    done(err);
  });
});

Post.fields = Object.keys(Post.schema);
Post.useTimestamps();
module.exports = Post;
