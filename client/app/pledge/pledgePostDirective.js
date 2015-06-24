angular.module('app')
.directive('pledgePost', function() {
  return {
    restrict: 'E',
    scope: {
      post: '='
    },
    templateUrl: './templates/pledgePost.html',
    link: function(scope, element, attr) {
    }
  }
})
