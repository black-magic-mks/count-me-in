angular.module('app')
.directive('postComment', function() {
  return {
    restrict: 'E',
    scope: {
      username: '=',
      text: '=',
      created: '='
    },
    templateUrl: './templates/comment.html',
    link: function(scope, element, attr) {
    }
  }
})
