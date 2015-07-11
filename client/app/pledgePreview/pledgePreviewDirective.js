angular.module('app')

.directive('pledgePreview', function() {
  return {
    restrict: 'E',
    scope: {
      pledge: '=',
      username: '=',
      loggedIn: '='
    },
    templateUrl: '/templates/pledgePreview.html',
    link: function(scope, element, attr) {
      console.log(scope.pledge)
      var convertTime = function(time) {
        return moment.unix(time / 1000).fromNow();
      }
      var lastUpdatedPost = scope.pledge.posts[scope.pledge.posts.length - 1].created;
      scope.lastUpdatedPost = convertTime(lastUpdatedPost);
    }
  };
});
