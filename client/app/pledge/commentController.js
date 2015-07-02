angular.module('app')

.controller('CommentController', function($scope, $ionicModal, commentRequests) {
  $scope.timeSince = function(date) {
    
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  $scope.usercomment = function(postId, text) {      
    commentRequests.postComment(postId, text, function(data) {
      $scope.created = $scope.timeSince(data.created);
      $scope.comments.push({text: text, username: $scope.currentUser, created: $scope.created});
    });
  };

  $scope.getComments = function(pledgeName) {
    commentRequests.getPledgePosts(pledgeName, function(data) {
      data.forEach(function(post) {
        commentRequests.getPostComments(post.id, function(data) {
          data.forEach(function(comment) {
            comment.created = $scope.timeSince(comment.created);
           $scope.comments.push(comment); 
          });
        });
      })
    });
  };
})

// .filter('slice', function(){
//   return function(arr, start, end){
//     return arr.slice(start, end);
//   }
// })

.factory('commentRequests', function($http) {
  var postComment = function(postId, text, callback) {
    $http.post('/api/post/comment', { post_id: postId, text: text} )
    .success(function(data, status, headers, config) {
      callback(data);
    }).error(function(data, status, headers, config) {
      console.log('error posting comment: ', data, status, headers, config);
    });
  };

  var getPostComments = function(postId, callback) {
    $http.get('/api/post/comments', {
      params: {postId: postId} 
    })
    .success(function(data, status, headers, config) {
      callback(data);
    }).error(function(data, status, headers, config) {
      console.log('error getting post comments', data, status, headers, config);
    })
  };

  var getPledgePosts = function(pledgename, callback) {
    $http.get('/api/pledge/posts', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for api/pledge/posts', data, status, headers, config);
    });
  };

  return {
    getPledgePosts: getPledgePosts,
    postComment: postComment,
    getPostComments: getPostComments
  };
})