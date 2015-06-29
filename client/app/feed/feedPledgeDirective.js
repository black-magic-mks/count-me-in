angular.module('app')
.directive('feedPledge', function() {
  return {
    restrict: 'E',
    scope: {
      post: '=',
      getcomments: '='
    },
    templateUrl: './templates/feedPledge.html',
    link: function(scope, element, attr) {
    }
  }
})
