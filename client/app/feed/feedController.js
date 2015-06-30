angular.module('app')

.controller('FeedController', function($scope, $ionicModal, feedFactory) {
  $scope.feedPosts = [];
  $scope.comments = [];
  $scope.commentsObj = {};

  // uses promises to put the public data onto the scope
  $scope.getPublicFeedPosts = function() {
    feedFactory.getPublicFeedPosts()
    .then(function(posts) {
      $scope.feedPosts = posts;
    });
  }
  // uses promises to put the private data onto the scope
  $scope.getPrivateFeedPosts = function() {
    feedFactory.getPrivateFeedPosts()
    .then(function(posts) {
      $scope.feedPosts = posts;
    });
  }

  // init function; feed will default to private feed if logged in and public feed if not
  $scope.init = function() {
    if ($scope.username) {
      $scope.getPrivateFeedPosts()
    } else {
      $scope.getPublicFeedPosts()
    }
  }

  // initializes the post data
  $scope.init();

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) { $scope.modal = modal; });

  $scope.saveMission = function() {
    $scope.modal.hide();
  };
})

.factory('feedFactory', function($http) {
  // gets the posts for the public feed
  var getPublicFeedPosts = function() {
    return $http({
      method: 'GET',
      url: '/api/public/feed',
    })
    .then(function(posts) {
      console.log("public: ", posts.data)
      return posts.data;
    })
    .catch(function(err) {
      console.log("error in getting posts in feedController.js: getPublicFeedPosts()")
    })
  }

  // gets the posts for the private feed
  var getPrivateFeedPosts = function() {
    return $http({
      method: 'GET',
      url: '/api/user/feed'
    })
    .then(function(posts) {
      console.log("private: ", posts.data)
      return posts.data;
    })
    .catch(function(err) {
      console.log("error in getting posts in feedController.js: getPrivateFeedPosts()")
    })
  }

  return {
    getPublicFeedPosts: getPublicFeedPosts,
    getPrivateFeedPosts: getPrivateFeedPosts
  };
})



.controller('FeedPledgeController', function($scope, $stateParams, feedPledgeFactory) {
  $scope.pledgename = $stateParams.pledgename;
  console.log($scope.pledgename, $stateParams.pledgename);
  feedPledgeFactory.getFeedPledgePosts($scope.pledgename)
  .then(function(posts) {
    $scope.feedPledgePosts = posts;
  })
})
.factory('feedPledgeFactory', function($http) {
  var getFeedPledgePosts = function(pledgename) {
    console.log(pledgename)
    return $http({
      method: 'GET',
      url: '/api/pledge/posts',
      params: {pledgename: pledgename}
    })
    .then(function(posts) {
      console.log("feed pledge posts: ", posts.data)
      return posts.data;
    })
    .catch(function(err) {
      console.log("error in getting posts in feedController.js: getFeedPledgePosts()")
    })
  }

  return {
    getFeedPledgePosts: getFeedPledgePosts
  }
})
