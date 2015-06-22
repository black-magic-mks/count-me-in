angular.module('app')
.directive('pledgePostPledgePage', function() {
  return {
    restrict: 'E',
    scope: {
      post: '='
    },
    templateUrl: './templates/pledgePost-pledge.html',
    link: function(scope, element, attr) {
    }
  }
})
