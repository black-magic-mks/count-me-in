angular.module('app')
.directive('comment', function() {
  return {
    restrict: 'E',
    scope: {
      comments: '=',
      usercomment: '=',
    },
    templateUrl: './templates/comment.html',
    link: function(scope, element, attr) {
      // post new user comment
      // scope.usercomment = function(postId, text) {
      //   return $http({
      //     method: 'POST',
      //     url: '/api/post/comment',
      //     data: {
      //       post_Id: postId,
      //       text: text
      //     }
      //   })
      //   .then(function(commentData) {
      //     console.log(commentData);
      //     var comments = [];
      //     comments.push(commentData);
      //   })
      //   .catch(function(err) {
      //     console.log('error in sending user comment: ', err)
      //   })
      // };
      
      //get comments on load
      

      
    }
  }
})