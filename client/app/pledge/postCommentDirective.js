angular.module('app')
.directive('postComment', function() {
  return {
    restrict: 'E',
    scope: {
      username: '=',
      text: '=',
      date: '='
    },
    templateUrl: './templates/comment.html',
    link: function(scope, element, attr) {
      console.log('scope', scope);
    }
  }
})
