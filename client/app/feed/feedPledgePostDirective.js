angular.module('app')
.directive('feedPledgePost', function() {
  return {
    restrict: 'E',
    scope: {
      username: '=',
      mission: '=',
      pledgePost: '=',
      date: '=',
      pledgename: '='
    },
    templateUrl: './templates/feedPledgePost.html',
    link: function(scope, element, attr) {
    }
  }
})
