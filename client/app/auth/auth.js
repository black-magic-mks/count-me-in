angular.module('app')

.run(function($state, $rootScope, Auth) {
  // do we want to do .then().catch() to do the $rootScope.loggedIn stuff???
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if ($state !== 'login' && $state !== 'signup') {
      console.log("yo you're in login or signup")
      // Auth.isLoggedIn()
      // .then(function(authenticated) {
      //   if (!authenticated) {
      //     $rootScope.loggedIn = false;
      //   } else {
      //     $rootScope.loggedIn = true;
      //   }
      // })
      // .catch(function(err) {
      //   console.log("hi");
      // })
    }
  })
})

.controller('AuthController', function($scope, $rootScope, $state, Auth) {
  $scope.user = {};
  $scope.passwordValidation = /.*(\d(?=.*[A-Z])|[A-Z](?=.*\d)).*/;
  angular.extend($scope, Auth);
})

.factory('Auth', function($http, $state) {
  // creates a session on the server
  var logIn = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/login',
      data: user
    })
    .then(function(res) {
      $state.go('tab.feed');
    })
    .catch(function(err) {
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
      console.log(res);
      // $state.go('tab.feed');
    })
    .catch(function(err) {
      console.log("error in register")
      console.error(err);
    });
  }


  // should delete session on back-end server
  var logOut = function() {
    return $http({
      method: 'POST',
      url: '/api/auth/logout'
    })
    .then(function(res) {
      $state.go('tab.feed');
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
