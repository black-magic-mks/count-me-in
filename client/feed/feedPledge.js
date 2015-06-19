angular.module('app')
.directive('feedPledge', function() {
  return {
    require: '^FeedController',
    restrict: 'E',
    scope: {
      pledgeName: '=',
      pledges: '='
    },
    templateUrl: 'feedPledge.html',
    link: function(scope, element, attr) {
    }
  }
})
