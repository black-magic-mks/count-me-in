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
    }
  }
})
