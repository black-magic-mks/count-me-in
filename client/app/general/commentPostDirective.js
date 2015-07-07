angular.module('app')
.directive('commentPost', function() {
  return {
    restrict: 'E',
    scope: {
      username: '=',
      text: '=',
      created: '='
    },
    templateUrl: './templates/commentPost.html',
    link: function(scope, element, attr) {
      var convertTime = function(time) {
        return moment.unix(time / 1000).fromNow();
      }
      scope.created = convertTime(scope.created);
    }
  }
})
