angular.module('app')

.controller('UserProfileController', function($scope, $stateParams, $rootScope, UserProfileFactory) {
  $scope.username = $stateParams.username || $rootScope.currentUser;
    UserProfileFactory.getUserProfilePosts($scope.username)
    .then(function(posts) {
      console.log("profile pledges and posts:", posts)
      $scope.profilePledges = posts;
    })
})
.factory('UserProfileFactory', function($http, $stateParams) {
  var getUserProfilePosts = function(username) {
    return $http({
      method: 'GET',
      url: '/api/user/posts',
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
    getUserProfilePosts: getUserProfilePosts
  }
})

.controller('UserController', function($scope, $rootScope, $stateParams, userFunc, follow, logOut) {
  $scope.followingList = [];

  userFunc.getUser($stateParams.username, function(data) {
    $scope.username = data.username;
  });

  $scope.addFollower = function() {
    follow.followUser($scope.username, function(data) {
      $scope.followingList.push(data);
      console.log('followingList: ', data, $scope.followingList);
    });
  };

  $scope.signOut = function() {
    logOut.clearSessionToken();
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

  return {
    getUser: getUser,
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

})
.factory('logOut', function($http, $state) {
    var clearSessionToken = function() {
    return $http({
      method: 'POST',
      url: '/api/auth/logout',
    })
    .then(function(username) {
      $state.go('login');
    })
    .catch(function(err) {
      console.log("error logging user out", err);
    })
  };

  return {
    clearSessionToken: clearSessionToken
  }
});

