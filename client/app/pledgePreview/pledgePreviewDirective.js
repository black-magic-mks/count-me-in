angular.module('app')

.directive('pledgePreview', function() {
  return {
    restrict: 'E',
    scope: {
      pledge: '=',
      username: '='
    },
    templateUrl: '/templates/pledgePreview.html'
  };
});
