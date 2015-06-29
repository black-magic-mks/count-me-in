angular.module('app')

.controller('FeedController', function($scope, $ionicModal, feedFunc) {
  $scope.currentUser;
  $scope.pledgeCategories = [];
  $scope.pledgeCatObj = {};
  $scope.pledgeCatObj.postList = [];
  $scope.tempObj = {};
  $scope.graphData = {};
  $scope.graphData.posts = [];
  $scope.comments = [];
  $scope.commentsObj = {};
  $scope.postId;

  feedFunc.getPublicFeedPosts()
    .then(function(posts) {
      $scope.publicFeedPosts = posts;
  });

  feedFunc.getCurrentUser(function(data){
    $scope.currentUser = data.username;
  });

  feedFunc.getFollowedPledges($scope.currentUser, function(data) {
    data.forEach(function(pledge) {
      $scope.pledgeCatObj.name = pledge.pledgename;
      $scope.tempObj.mission = pledge.mission;

      feedFunc.getPledgePosts(pledge.pledgename, function(data){
        data.forEach(function(post) {
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

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) { $scope.modal = modal; });

  $scope.saveMission = function() {
    $scope.modal.hide();
  };
})

.factory('feedFunc', function($http) {

  var getPublicFeedPosts = function() {
    return $http({
      method: 'GET',
      url: '/api/public/feed',
    })
    .then(function(posts) {
      return posts;
    })
    .catch(function(err) {
      console.log("error in getting all pledges in feedController.js: getPublicFeedPosts()")
    })
  }

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

  return {
    getFollowedPledges: getFollowedPledges,
    getPledgePosts: getPledgePosts,
    getPledgeView: getPledgeView,
    getCurrentUser: getCurrentUser,
    getPublicFeedPosts: getPublicFeedPosts
  };
});
