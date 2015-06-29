angular.module('app')
.directive('commentForm', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/commentForm.html',
    link: function(scope, element, attr) {
    }
  }
})
