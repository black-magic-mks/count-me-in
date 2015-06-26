angular.module('app')

.controller('UserController', function($scope, userFunc) {
  $scope.user = userFunc;
  $scope.pledgePreview = [];

  userFunc.getUser(null, function(data) {
    $scope.username = data.username;
  });
  userFunc.getUserPledges(null, function(data) {
    $scope.pledgePreview = $scope.pledgePreview.concat (data);
    console.log(data,$scope.pledgePreview);
  });

  console.log('pledgePreview in controller: ', $scope.pledgePreview);
})
.factory('userFunc', function($http) {
  var username;
  var getUser = function(username, callback) {
    $http.get('/api/user', {
      params: {username: username}
    })
    .success(function(data, status, headers, config) {
      username = data.username;
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for getUser');
    });
  };
  var getUserPledges = function(username, callback) {
    $http.get('/api/user/pledges', {
      params: {username: username}
    })
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for getUserPledges');
    });
  };

  return {
    getUser: getUser,
    getUserPledges: getUserPledges,
    username: username
  }

});

