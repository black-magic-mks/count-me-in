angular.module('app')

.directive('pledgePreview', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/pledgePreview.html'
  };
});
