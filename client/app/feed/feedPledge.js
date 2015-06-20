angular.module('app')
.directive('feedPledge', function() {
  return {
    require: '^FeedController',
    restrict: 'E',
    scope: {
      pledgeName: '=',
      pledges: '='
    },
    templateUrl: './templates/feedPledge.html',
    link: function(scope, element, attr) {
    }
  }
})
