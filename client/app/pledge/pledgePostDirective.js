angular.module('app')
.directive('pledgePost', function() {
  return {
    restrict: 'E',
    scope: {
      post: '=',
      comments: '=',
      postNewComment: '=',
      test: '=',
      usercomment: '=',
      date: '=',
      pledgename: '='
    },
    templateUrl: './templates/pledgePost.html',
    link: function(scope, element, attr) {
    }
  }
})
