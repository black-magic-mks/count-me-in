angular.module('app')

.controller('UserProfileController', function($scope, $stateParams, $rootScope, UserProfileFactory, follow) {
  $scope.username = $stateParams.username || $rootScope.currentUser;
  UserProfileFactory.getUserProfilePosts($scope.username)
  .then(function(pledges) {
    pledges.sort(function(pledge1, pledge2) {
      return pledge2.posts[0].created - pledge1.posts[0].created;
    })
    $scope.profilePledges = pledges;
  })
  $scope.addFollower = function() {
    console.log($stateParams)
    follow.followUser($stateParams.username);
  };
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

// we don't use this at all but it causes bugs if we just remove it
.controller('UserController', function($scope, $rootScope, $stateParams, userFunc, follow, logOut) {
  $scope.signOut = function() {
    // length error???
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
  var followUser = function(username) {
    return $http({
      method: 'POST',
      url: '/api/user/follow',
      data: {username: username}
    })
    .then(function(user) {
      return user.data;
    })
    .catch(function(err) {
      console.log('error in following a user');
    })
  };

  return {
    followUser: followUser
  }

})
.factory('logOut', function($http, $state, $rootScope) {
    var clearSessionToken = function() {
      return $http({
        method: 'POST',
        url: '/api/auth/logout'
      })
      .then(function(res) {
        $rootScope.currentUser = null;
        $state.go('feed.all');
      })
      .catch(function(err) {
        console.error(err);
      });
  };

  return {
    clearSessionToken: clearSessionToken
  }
});

