angular.module('app')
.run(function($state, $rootScope, $timeout, authFactory) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.name !== 'login' && toState.name !== 'signup') {
      authFactory.isLoggedIn()
      .then(function(authenticated) {
        console.log('authentication: ', authenticated)
        if (authenticated) {
          $rootScope.loggedIn = true;
        } else {
          $rootScope.loggedIn = false;
        }
      })
    } else if ($rootScope.loggedIn && (toState.name === 'login' || toState.name === 'signup')) {
      $timeout(function() {
        $state.go('feed.all');
      });
    }
  })
})
