var getPledge = function(req, res) {
  res.send('pledgeAdapter.getPledge');
};

var createPledge = function(req, res) {
  res.send('pledgeAdapter.createPledge');
};

var subscribeToPledge = function(req, res) {
  res.send('pledgeAdapter.subscribeToPledge');
};

var getPledgeUsers = function(req, res) {
  res.send('pledgeAdapter.getPledgeUsers');
};

var getPledgePosts = function(req, res) {
  res.send('pledgeAdapter.getPledgePosts');
};

module.exports = {
  getPledge: getPledge,
  createPledge: createPledge,
  subscribeToPledge: subscribeToPledge,
  getPledgeUsers: getPledgeUsers,
  getPledgePosts: getPledgePosts
};
