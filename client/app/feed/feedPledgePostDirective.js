angular.module('app')
.directive('feedPledgePost', function() {
  return {
    restrict: 'E',
    scope: {
      username: '=',
      mission: '=',
      pledgePost: '=',
      pledgeName: '=',
      aws_url: '=',
      date: '='    
    },
    templateUrl: './templates/feedPledgePost.html',
    link: function(scope, element, attr) {
    }
  }
})
