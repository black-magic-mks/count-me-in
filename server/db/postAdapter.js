var createPost = function(req, res) {
  res.send('postAdapter.createPost');
};

var createComment = function(req, res) {
  res.send('postAdapter.createComment');
};

var likePost = function(req, res) {
  res.send('postAdapter.likePost');
};

module.exports = {
  createPost: createPost,
  createComment: createComment,
  likePost: likePost
};
