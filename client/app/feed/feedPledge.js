angular.module('app')
.directive('feedPledge', function() {
  return {
    restrict: 'E',
    scope: {
      pledgeName: '=',
      pledgeList: '='
    },
    templateUrl: './templates/feedPledge.html',
    link: function(scope, element, attr) {
    }
  }
})
