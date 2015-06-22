angular.module('app')

.controller('AuthController', function($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.passwordValidation = /.*(\d(?=.*[A-Z])|[A-Z](?=.*\d)).*/;

  angular.extends($scope, Auth);
  // couldn't I just put the localstorage, $location, and error checking into the factory function?
  // test that when you can
  $scope.logIn = function() {
    Auth.logIn($scope.user)
    .then(function(token) {
      $window.localStorage.setItem('loggedIn', token);
      $location.path('/i/feed');
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  $scope.register = function() {
    Auth.register($scope.user)
    .then(function(token) {
      $window.localStorage.setItem('loggedIn', token);
      $location.path('/i/feed');
    })
    .catch(function(err) {
      console.error(err);
    });
  }
})

.factory('Auth', function($http, $location, $window) {
  var logIn = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/login',
      data: user
    })
    .then(function(res) {
      return res.data.token;
    });
  }

  var register = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/register',
      data: user
    })
    .then(function(res) {
      return res.data.token;
    });
  }

  var logOut = function() {
    $window.localStorage.removeItem('loggedIn');
    $location.path('/i/feed');
  }

  var isLoggedIn = function() {
     return !!$window.localStorage.getItem('loggedIn');
  }

  return {
    logIn: logIn,
    register: register,
    logOut: logOut,
    isLoggedIn: isLoggedIn
  }
})
