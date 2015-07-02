angular.module('app')
.directive('comment', function($http, $rootScope) {
  return {
    restrict: 'E',
    scope: {
      comments: '=',
      postId: '=',
      postComments: '='
    },
    templateUrl: './templates/comment.html',
    link: function(scope, element, attr) {
      // post new user comment on form submission
      // console.log('scope', scope);
      // console.log('element', element);
      // console.log('attr', attr);
      // console.log('scope.postId', scope.postId);
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
          console.log('scope.postComments', scope.postComments);
          // need to push into post with post id
          scope.postComments.push(commentData);
          return scope.postComments;
        })
        .catch(function(err) {
          console.log('error in sending user comment: ', err)
        })
      };
    console.log(scope)        
    }
  }
})