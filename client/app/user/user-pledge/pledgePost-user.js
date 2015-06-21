angular.module('app')
.directive('pledgePostUserPage', function() {
  return {
    restrict: 'E',
    scope: {
      post: '='
    },
    templateUrl: './templates/pledgePost-user.html',
    link: function(scope, element, attr) {
    }
  }
})
