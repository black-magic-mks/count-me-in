angular.module('app')
.directive('likes', function($http, $state, $rootScope) {
  return {
    restrict: 'E',
    scope: {
      postId: '=',
      likes: '=',
      hasLiked: '='
    },
    templateUrl: './templates/likes.html',
    link: function(scope, element, attribute) {
      scope.postLike = function(postId) {
        if (!$rootScope.username) {
          $state.go('login');
        }
        return $http({
          method: 'POST',
          url: '/api/post/like',
          data: {postId: postId}
        })
        .then(function(postData) {
          scope.likes = postData.data.likes;
          scope.hasLiked = postData.data.hasLiked;
          return;
        })
        .catch(function(err) {
          console.log('err');
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
          scope.likes = postData.data.likes;
          scope.hasLiked = postData.data.hasLiked;
          return;
        })
        .catch(function(err) {
          console.log('error in postUnlike: ', err)
        })
      }
    }
  }
})
