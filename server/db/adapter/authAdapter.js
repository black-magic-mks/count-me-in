var login = function(req, res) {
  res.send('authAdapter.login');
};

var logout = function(req, res) {
  res.send('authAdapter.logout');
};

var register = function(req, res) {
  res.send('authAdapter.register');
};

var isAuthorized = function(req, res) {
  res.send('authAdapter.isAuthorized');
}

module.exports = {
  login: login,
  logout: logout,
  register: register,
  isAuthorized: isAuthorized
};
