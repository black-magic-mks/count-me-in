angular.module('app')
.directive('commentPost', function() {
  return {
    restrict: 'E',
    scope: {
      username: '=',
      text: '=',
      created: '=',
      comment: '='
    },
    templateUrl: './templates/commentPost.html',
    link: function(scope, element, attr) {
    }
  }
})