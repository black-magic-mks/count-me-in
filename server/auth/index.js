module.expors = function(req, res, next) {
  req.username = 'user';
  next();
};
