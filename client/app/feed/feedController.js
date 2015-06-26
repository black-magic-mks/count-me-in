angular.module('app')

.controller('FeedController', function($scope, $ionicModal, feedFunc) {
  // angular.extend($scope, feedFunc);
  $scope.pledgeCategories = [];
  $scope.pledgeCatObj = {};
  $scope.pledgeCatObj.postList = [];
  $scope.tempObj = {};

  $scope.graphData = {};
  $scope.graphData.posts = [];
  $scope.tests = 'moni';
  $scope.postComment = feedFunc.postComment;

  $scope.usercomment = function() {
    console.log('feedFunc.postComment', feedFunc.postComment);
    console.log('sfeedFunc.getFollowedPledges', feedFunc.getFollowedPledges);
    // $scope.postComment();
  };

  $scope.comments = [{
      username: 'david',
      date: '5/8',
      text: 'Keep up the great work!'
    },
    {
      username: 'david',
      date: '5/8',
      text: 'Keep up the great work!'
  }
  ];

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
        console.log('pledgecat', $scope.pledgeCategories);
      
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
      console.log('error with request');
    });
  };

  var postComment = function(pledgename, callback) {
    $http.get('/api/pledge/posts', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      callback(data);

    }).error(function(data, status, headers, config) {
      console.log('error with request');
    });
  };

  return {
    getFollowedPledges: getFollowedPledges,
    getPledgePosts: getPledgePosts,
    getPledgeView: getPledgeView
  };
});

 