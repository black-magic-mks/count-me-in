angular.module('app')
.directive('feedPledge', function() {
  return {
    restrict: 'E',
    scope: {
      pledgeName: '=',
      post: '=',
      getcomments: '=',
      getPledgePosts: '='
    },
    templateUrl: './templates/feedPledge.html',
    link: function(scope, element, attr) {
    }
  }
})
