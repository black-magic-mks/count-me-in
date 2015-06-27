angular.module('app')
.directive('feedPledgePost', function() {
  return {
    restrict: 'E',
    scope: {
      username: '=',
      mission: '=',
      pledgePost: '=',
      pledgename: '=',
      awsurl: '=',
      date: '='    
    },
    templateUrl: './templates/feedPledgePost.html',
    link: function(scope, element, attr) {
    }
  }
})
