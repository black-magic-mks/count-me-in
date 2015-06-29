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
        $http({
          method: 'POST',
          url: '/api/post',
          data: {postId: postId}
        })
        .then(function(data) {
          var likeData = {};
          likeData.numLikes = data.likes;
          likeData.hasLiked = data.hasLiked
          return likeData;
        })
        .catch(function(err) {
          console.log('error in getPost: ', err);
        })
      }

      scope.postLike = function(postId) {
        $http({
          method: 'POST',
          url: '/api/post/like',
          data: {postId: postId}
        })
        .then(function(data) {
          var likeData = {};
          likeData.numLikes = data.likes;
          likeData.hasLiked = data.hasLiked
          return likeData;
        })
        .catch(function(err) {
          console.log('error in postLike: ', err);
        })
      }
      scope.postUnlike = function(postId) {
        $http({
          method:'POST',
          url: '/api/post/unlike',
          data: {postId: postId}
        })
        .then(function(data) {
          var likeData = {};
          likeData.numLikes = data.likes;
          likeData.hasLiked = data.hasLiked
          return likeData;
        })
        .catch(function(err) {
          console.log('error in postUnlike: ', err)
        })
      }
    },
    controller: function(scope) {
      scope.getPost(scope.postId).then(function(likeData) {
        scope.likeData = likeData;
      });
    }
  }
})
