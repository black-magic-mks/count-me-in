angular.module('app')
.directive('likes', function($http) {
  return {
    restrict: 'E',
    scope: {
      postId: '='
    },
    templateUrl: './templates/likes.html',
    link: function(scope, element, attribute) {
      scope.getPost = function(postId) {
        return $http({
          method: 'GET',
          url: '/api/post',
          params: {
            postId: postId
          }
        })
        .then(function(postData) {
          var likeData = {};
          likeData.numLikes = postData.data.likes;
          likeData.hasLiked = postData.data.hasLiked;
          return likeData;
        })
        .catch(function(err) {
          console.log('error in getPost: ', err);
        })
      }

      scope.postLike = function(postId) {
        return $http({
          method: 'POST',
          url: '/api/post/like',
          data: {postId: postId}
        })
        .then(function(postData) {
          var likeData = {};
          likeData.numLikes = postData.data.likes;
          likeData.hasLiked = postData.data.hasLiked;
          scope.likeData = likeData;
          return likeData;
        })
        .catch(function(err) {
          console.log('error in postLike: ', err);
        })
      }
      scope.postUnlike = function(postId) {
        return $http({
          method:'POST',
          url: '/api/post/unlike',
          data: {postId: postId}
        })
        .then(function(postData) {
          var likeData = {};
          likeData.numLikes = postData.data.likes;
          likeData.hasLiked = postData.data.hasLiked;
          scope.likeData = likeData;
          return likeData;
        })
        .catch(function(err) {
          console.log('error in postUnlike: ', err)
        })
      }

      // gets the data for the initial load
      scope.getPost(scope.postId)
      .then(function(likeData) {
        scope.likeData = likeData;
      });
    }
  }
})
