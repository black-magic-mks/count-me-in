  angular.module('app')
.directive('pledgePost', function() {
  return {
    restrict: 'E',
    scope: {
      post: '=',
      comments: '=',
      usercomment: '=',
      date: '=',
      pledgename: '=',
      toggleComments: '=',
      loggedIn: '='
    },
    templateUrl: './templates/pledgePost.html',
    link: function(scope, element, attr) {
      var convertTime = function(time) {
        return moment.unix(time / 1000).fromNow();
      }
      scope.post.created = convertTime(scope.post.created);
    }
  }
})
