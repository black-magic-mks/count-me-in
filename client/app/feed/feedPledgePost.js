angular.module('app')
.directive('feedPledgePost', function() {
  return {
    require: '^FeedController',
    restrict: 'E',
    scope: {
      username: '=',
      mission: '=',
      pledgePost: '=',
      date: '='
    },
    templateUrl: './templates/feedPledgePost.html',
    link: function(scope, element, attr) {
    }
  }
})
