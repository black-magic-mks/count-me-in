angular.module('app')

.controller('FeedController', function($scope, $ionicModal, feedFunc) {
  $scope.currentUser;
  $scope.pledgeCategories = [];
  $scope.pledgeCatObj = {};
  $scope.pledgeCatObj.postList = [];
  $scope.tempObj = {};
  $scope.graphData = {};
  $scope.graphData.posts = [];
  $scope.comments = [{username: 'monica', text: 'great job', date: '3 days'}];
  $scope.commentsObj = {};
  $scope.postId;

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
    feedFunc.postComment(postId, text, function(data) {
      $scope.date = $scope.timeSince(data.created);
      $scope.comments.push({text: text, username: $scope.currentUser, date: $scope.date});
    });
  };

  feedFunc.getCurrentUser(function(data){
    $scope.currentUser = data.username;
  });

  feedFunc.getFollowedPledges('mengel', function(data) {
    console.log('data1', data);
    data.forEach(function(pledge) {
      console.log('pledge: ', pledge);
      $scope.pledgeCatObj.name = pledge.pledgename;
      $scope.tempObj.mission = pledge.mission;

      feedFunc.getPledgePosts(pledge.pledgename, function(data){
        data.forEach(function(post) {
          console.log('post: ', post);
          $scope.tempObj.date = data.created;
          $scope.tempObj.aws_url = post.aws_url;
          $scope.tempObj.username = post.username;
        })
        $scope.pledgeCatObj.postList.push($scope.tempObj);
        $scope.pledgeCategories.push($scope.pledgeCatObj);
      })
    })
  });

  feedFunc.getPledgeView('piano', function(data) {
    data.forEach(function(post) {
      $scope.graphData.name = 'piano';
      $scope.graphData.date = data.created;
      $scope.postId = post.id;  
      $scope.graphData.posts.push(post);
    })
  });

  feedFunc.getPostComments($scope.postId, function(data) {
    data.forEach(function(comment) {
      $scope.comments.push(comment);
    });
  });

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) { $scope.modal = modal; });

  $scope.saveMission = function() {
    $scope.modal.hide();
  };
})

.factory('feedFunc', function($http) {

  var getCurrentUser = function(callback) {
    $http.get('/api/user')
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error getting current user: ', data, status, headers, config);
    })
  };

  var getFollowedPledges = function(username, callback) {
    $http.get('/api/user/pledges', {
      params: {username: username}
    })
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for api/user/pledges');
    });
  };

  var getPledgePosts = function(pledgename, callback) {
    $http.get('/api/pledge/posts', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      console.log('getPledgePosts', data);
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for api/pledge/posts', data, status, headers, config);
    });
  };

  var getPledgeView = function(pledgename, callback) {
    $http.get('/api/pledge/posts', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      callback(data);

    }).error(function(data, status, headers, config) {
      console.log('error getting pledge: ', data, status, headers, config);
    });
  };

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
      params: {post_id: postId} 
    })
    .success(function(data, status, headers, config) {
      callback(data);
    }).error(function(data, status, headers, config) {
      console.log('error getting post comments', data, status, headers, config);
    })
  };

  return {
    getFollowedPledges: getFollowedPledges,
    getPledgePosts: getPledgePosts,
    getPledgeView: getPledgeView,
    postComment: postComment,
    getCurrentUser: getCurrentUser,
    getPostComments: getPostComments
  };
});
