angular.module('app')
.directive('feedPledge', function() {
  return {
    restrict: 'E',
    scope: {
      post: '=',
      getcomments: '=',
      getPledgePosts: '='
    },
    templateUrl: './templates/feedPledge.html',
    link: function(scope, element, attr) {
    }
  }
})
