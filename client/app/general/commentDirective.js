angular.module('app')
.directive('comment', function($http, $rootScope, $timeout) {
  return {
    restrict: 'E',
    scope: {
      comments: '=',
      postId: '=',
      postComments: '=',
      model: '=',
      collapsed: '='
    },
    templateUrl: './templates/comment.html',
    link: function(scope, element, attr) {
      // post new user comment on form submission
      scope.usercomment = function(postId, text) {
        return $http({
          method: 'POST',
          url: '/api/post/comment',
          data: {
            postId: postId,
            text: text,
            //need to change username to user once merged
            username: $rootScope.username
          }
        })
        .then(function(commentData) {
          console.log('commentData: ', commentData);
          $timeout(function(){
            scope.postComments.push(commentData.data);
          })
          return commentData;
        })
        .catch(function(err) {
          console.log('error in sending user comment: ', err)
        })
      };
    }
  }
})