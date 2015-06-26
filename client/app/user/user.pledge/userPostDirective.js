angular.module('app')
.directive('userPost', function() {
  return {
    restrict: 'E',
    scope: {
      post: '='
    },
    templateUrl: './templates/userPost.html',
    link: function(scope, element, attr) {
    }
  }
})
