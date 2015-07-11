angular.module('app')
.directive('feedPledge', function() {
  return {
    restrict: 'E',
    scope: {
      post: '=',
      getPledgePosts: '=',
      showcommentbox: '=',
      loggedIn: '='
    },
    templateUrl: './templates/feedPledge.html',
    link: function(scope, element, attr) {
    }
  }
})
