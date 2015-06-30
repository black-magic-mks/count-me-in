angular.module('app')

.run(function($state, $rootScope, Auth) {
  // do we want to do .then().catch() to do the $rootScope.loggedIn stuff???
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if ($state !== 'login' && $state !== 'signup') {
      Auth.isLoggedIn()
      .then(function(authenticated) {
        if (authenticated) {
          $rootScope.loggedIn = true;
        } else {
          $rootScope.loggedIn = false;
        }
      })
    }
  })
})

.controller('AuthController', function($scope, $rootScope, $state, Auth) {
  $scope.user = {};
  $scope.passwordValidation = /.*(\d(?=.*[A-Z])|[A-Z](?=.*\d)).*/;
  angular.extend($scope, Auth);
  $scope.register = function(user) {
    Auth.register(user);
    $scope.submitted = true;
  }
})

.factory('Auth', function($http, $state, $rootScope) {
  // creates a session on the server
  var logIn = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/login',
      data: user
    })
    .then(function(res) {
      $rootScope.username = user.username;
      $state.go('tab.feed.all');
    })
    .catch(function(err) {
      $state.go('tab.login');
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
      $rootScope.username = user.username;
      $rootScope.loggedIn = true;
      $state.go('tab.feed.all');
    })
    .catch(function(err) {
      $state.go('tab.signup')
    });
  }


  // should delete session on back-end server
  var logOut = function() {
    return $http({
      method: 'POST',
      url: '/api/auth/logout'
    })
    .then(function(res) {
      $rootScope.username = null;
      $state.go('tab.feed.all');
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
      return true;
    })
    .catch(function(err) {
      console.log("Not logged in");
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
