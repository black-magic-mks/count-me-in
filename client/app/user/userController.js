angular.module('app')

.controller('UserProfileController', function($scope, $stateParams, $rootScope, UserProfileFactory) {
  $scope.username = $stateParams.username || $rootScope.currentUser;
    UserProfileFactory.getUserProfilePledges($scope.username)
    .then(function(pledges) {
      console.log("profile pledges:", pledges)
      $scope.profilePledges = pledges;
    })
})
.factory('UserProfileFactory', function($http, $stateParams) {
  var getUserProfilePledges = function(username) {
    return $http({
      method: 'GET',
      url: '/api/user/pledges',
      params: {username: username}
    })
    .then(function(pledges) {
      return pledges.data;
    })
    .catch(function(err) {
      console.log('error in UserProfileFactory: getUserProfilePledges()');
    })
  }

  return {
    getUserProfilePledges: getUserProfilePledges
  }
})







.controller('UserController', function($scope, $rootScope, $stateParams, userFunc, follow) {
  $scope.pledgePreview = [];
  $scope.followingList = [];

  userFunc.getUser($stateParams.username, function(data) {
    $scope.username = data.username;
  });
  userFunc.getUserPledges($stateParams.username, function(data) {
    $scope.pledgePreview = $scope.pledgePreview.concat(data);
    console.log(data,$scope.pledgePreview);
  });

  $scope.addFollower = function() {
    follow.followUser($scope.username, function(data) {
      $scope.followingList = $scope.followingList.push(data);
      console.log('followingList: ', data, $scope.followingList);
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

