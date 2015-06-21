var login = function(req, res) {
  res.send('authAdapter.login');
};

var logout = function(req, res) {
  res.send('authAdapter.logout');
};

var register = function(req, res) {
  res.send('authAdapter.register');
};

module.exports = {
  login: login,
  logout: logout,
  register: register
};
