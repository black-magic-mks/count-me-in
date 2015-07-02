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
        return $http({
          method: 'POST',
          url: '/api/post/comment',
          data: {
            post_Id: postId,
            text: text,
            //need to grab current user
            username: 'moni'
          }
        })
        .then(function(commentData) {
          console.log('commentData ', commentData);
          console.log('scope.postComments', scope.postComments);
          scope.postComments.push(commentData);
          return scope.postComments;
        })
        .catch(function(err) {
          console.log('error in sending user comment: ', err)
        })
      };
            
    }
  }
})