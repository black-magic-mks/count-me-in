angular.module('app')

.controller('UserController', function($scope, $rootScope, $stateParams, userFunc, follow, logOut) {
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

