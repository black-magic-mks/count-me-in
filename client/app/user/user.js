angular.module('app')

.controller('UserController', function($scope, userFunc) {
  // angular.extend($scope, userFunc);
  $scope.user = userFunc;
  $scope.pledgePreview = [];

  userFunc.getUser();
  userFunc.getUserPledges(null, function(data) {
    $scope.pledgePreview = $scope.pledgePreview.concat(data);
    console.log(data,$scope.pledgePreview);
  });
  // userFunc.getUserPledges(function(pledgePreview) {
  //   $scope.pledgePreview = pledgePreview;
  // });
  console.log('pledgePreview in controller: ', $scope.pledgePreview);
})
.factory('userFunc', function($http) {
  // var pledgePreview = [];
  var username;
  var getUser = function(username) {
    $http.get('/api/user', {
      params: {username: username}
    })
    .success(function(data, status, headers, config) {
      username = data.username;
      console.log('getUser: ', data);
      console.log('username to show: ', data.username);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for getUser');
    });
  };
  var getUserPledges = function(username, cb) {
    $http.get('/api/user/pledges', {
      params: {username: username}
    })
    .success(function(data, status, headers, config) {
      console.log('getUserPledges: ', data);
          cb(data);
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

