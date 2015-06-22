angular.module('app')

.controller('authController', function($scope, Auth, $location, $window) {
  $scope.user = {};
  $scope.passwordValidation = /.*(\d(?=.*[A-Z])|[A-Z](?=.*\d)).*/;

  angular.extends($scope, Auth);

  $scope.logIn = function() {
    Auth.logIn($scope.username, $scope.password)
    .then(function(token) {
      $window.localStorage.setItem('loggedIn', token);
      $location.path('./i/feed');
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  $scope.register = function() {
    Auth.register($scope.username, $scope.password)
    .then(function(token) {
      $window.localStorage.setItem('loggedIn', token);
      $location.path('./i/feed');
    })
    .catch(function(err) {
      console.error(err);
    });
  }
})

.factory('Auth', function($http, $location, $window) {
  var logIn = function(username, password) {
    return $http({
      method: 'POST',
      url: '/api/auth/login',
      data: {username: username, password: password}
    })
    .then(function(res) {
      return res.data.token;
    });
  }

  var register = function(username, password) {
    return $http({
      method: 'POST',
      url: '/api/auth/register',
      data: {username: username, password: password}
    })
    .then(function(res) {
      return res.data.token;
    });
  }

  var logOut = function() {
    $window.localStorage.removeItem('loggedIn');
    $location.path('./i/feed');
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
