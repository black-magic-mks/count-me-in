angular.module('app')
.directive('feedPledgePost', function() {
  return {
    restrict: 'E',
    scope: {
      username: '=',
      mission: '=',
      pledgePost: '=',
      date: '='    },
    templateUrl: './templates/feedPledgePost.html',
    link: function(scope, element, attr) {
    }
  }
})
