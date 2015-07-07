angular.module('app')
.directive('userPost', function() {
  return {
    restrict: 'E',
    scope: {
      post: '=',
      numPosts: '='
    },
    templateUrl: './templates/userPost.html',
    link: function(scope, element, attr) {
      var convertTime = function(time) {
        return moment.unix(time / 1000).format("LLL");
      }
      scope.post.created = convertTime(scope.post.created);
    }
  }
})
