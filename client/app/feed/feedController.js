angular.module('app')

.controller('FeedController', function($scope, $ionicModal, feedFunc) {
  $scope.currentUser;
  $scope.pledgeCategories = [];
  $scope.pledgeCatObj = {};
  $scope.pledgeCatObj.postList = [];
  $scope.tempObj = {};
  $scope.graphData = {};
  $scope.graphData.posts = [];
  $scope.comments = [{username: 'mengel', text: 'keep up the great work!'}];
  $scope.commentsObj = {};

  //need to get all comments associated with postId

  $scope.usercomment = function(postId, text) {      
    feedFunc.postComment(postId, text, function(data) {
      $scope.commentsObj.text = text;
      $scope.commentsObj.username = $scope.currentUser;
      $scope.comments.push($scope.commentsObj);
      console.log('comments array: ', $scope.comments);
    });
  };

  feedFunc.getCurrentUser(function(data){
    $scope.currentUser = data.username;
  });

  feedFunc.getFollowedPledges('mengel', function(data) {
    data.forEach(function(pledge) {

      $scope.pledgeCatObj.name = pledge.pledgename;
      $scope.tempObj.mission = pledge.mission;

      feedFunc.getPledgePosts(pledge.pledgename, function(data){
        
        data.forEach(function(post) {
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
      $scope.graphData.posts.push(post);
    })
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

  return {
    getFollowedPledges: getFollowedPledges,
    getPledgePosts: getPledgePosts,
    getPledgeView: getPledgeView,
    postComment: postComment,
    getCurrentUser: getCurrentUser
  };
});

 