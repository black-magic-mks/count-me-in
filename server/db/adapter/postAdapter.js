var createPost = function(req, res) {
  console.log('in createPost');
  console.log('request body', req.body);
  
  var file = req.files.file;
  console.log('request files', file);
  console.log('file name', file.name);
  console.log('file type', file.type);

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
