angular.module('app')

.controller('UserController', function($scope, userFunc, follow) {
  $scope.pledgePreview = [];
  $scope.followerArray = [];

  userFunc.getUser(null, function(data) {
    $scope.username = data.username;
  });
  userFunc.getUserPledges(null, function(data) {
    $scope.pledgePreview = $scope.pledgePreview.concat (data);
    console.log(data,$scope.pledgePreview);
  });

  $scope.addFollower = function() {
    follow.followUser($scope.username, function(data) {
      $scope.followerArray = $scope.followerArray.concat (data);
      console.log('followerArray: ', data, $scope.followerArray);
    });
  };
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
      console.log('error status with getUser: ', status, data, headers, config);
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
      console.log('error status with getUserPledges: ', status, data, headers, config);
    });
  };

  return {
    getUser: getUser,
    getUserPledges: getUserPledges,
    username: username
  }

})
.factory('follow', function($http) {
  var followUser = function(username, callback) {
    console.log('username: ', username);
    $http.post('/api/user/follow', {username: username})
    .success(function(data, status, headers, config) {
      callback(data);
      console.log('followUser data: ', data);
    })
    .error(function(data, status, headers, config) {
      console.log('error status with followUser: ', status, data, headers, config);
    });
  };

  return {
    followUser: followUser
  }

});

