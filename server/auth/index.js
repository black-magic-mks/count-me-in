module.exports = function(req, res, next) {
  req.username = 'therealest';
  next();
};
