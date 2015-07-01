angular.module('app')

.directive('pledgePreview', function() {
  return {
    restrict: 'E',
    scope: {
      pledge: '='
    },
    templateUrl: '/templates/pledgePreview.html'
  };
});
