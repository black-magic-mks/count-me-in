angular.module('app')

.controller('UserController', function($scope, userFunc) {
  angular.extend($scope, userFunc);
  $scope.getUser();
  $scope.getUserPledges();
})
.factory('userFunc', function($http) {
  var pledgePreview = [];
  var getUser = function(username) {
    $http.get('/api/user', {
      params: {username: username}
    })
    .success(function(data, status, headers, config) {
      console.log('getUser: ', data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for getUser');
    });
  };

  var getUserPledges = function(username) {
    $http.get('/api/user/pledges', {
      params: {username: username}
    })
    .success(function(data, status, headers, config) {
      console.log('getUserPledges: ', data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for getUserPledges');
    });
  };

  return {
    getUser: getUser,
    getUserPledges: getUserPledges,
    pledgePreview: pledgePreview
  }

});

