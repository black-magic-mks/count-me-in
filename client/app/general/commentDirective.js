angular.module('app')
.directive('comment', function($http) {
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
      scope.usercomment = function(postId, text) {
        console.log('usercomment called!');
        console.log('postId', postId);
        console.log('text', text);
        // return $http({
        //   method: 'POST',
        //   url: '/api/post/comment',
        //   data: {
        //     post_Id: postId,
        //     text: text
        //   }
        // })
        // .then(function(commentData) {
        //   console.log(commentData);
        //   comments.push(commentData);
        // })
        // .catch(function(err) {
        //   console.log('error in sending user comment: ', err)
        // })
      };
            
    }
  }
})