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
      var convertTime = function(time) {
        return moment.unix(time / 1000).fromNow();
      }
      var convertLocalTime = function(time) {
        return moment.unix(time / 1000).format('LLL');
      }
      var lastUpdatedPost = scope.pledge.posts[0].created;
      scope.lastUpdatedPost = convertTime(lastUpdatedPost);
      var posts = scope.pledge.posts;
      for (var i = 0; i < posts.length; i++) {
        posts[i].created = convertLocalTime(posts[i].created)
      }
    }
  };
});
