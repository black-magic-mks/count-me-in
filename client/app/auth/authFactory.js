angular.module('app')
.factory('authFactory', function($http, $state, $rootScope) {
  // creates a session on the server
  var logIn = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/login',
      data: user
    })
    .then(function(res) {
      $rootScope.currentUser = user.username;
      $rootScope.loggedIn = true;
      $state.go('feed.all');
    })
    .catch(function(err) {
      $state.go('login');
      console.error(err);
    });
  }

  // creates a session on the server and node on the database
  var register = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/register',
      data: user
    })
    .then(function(res) {
      $rootScope.currentUser = user.username;
      $rootScope.loggedIn = true;
      $state.go('feed.all');
    })
    .catch(function(err) {
      $state.go('signup')
    });
  }


  // should delete session on back-end server
  var logOut = function() {
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
  }

  // checks if the user is logged in
  var isLoggedIn = function() {
    return $http({
      method: 'GET',
      url: '/api/auth/authorized'
    })
    .then(function(res) {
      $rootScope.currentUser = res.data;
      return true;
    })
    .catch(function(err) {
      return false;
    });
  }

  return {
    logIn: logIn,
    register: register,
    logOut: logOut,
    isLoggedIn: isLoggedIn
  }
})
