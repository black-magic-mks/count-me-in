angular.module('app')

.controller('FeedController', function($scope, $ionicModal, feedFactory) {
  $scope.feedPosts = [];
  $scope.comments = [];
  $scope.commentsObj = {};

  $scope.getPublicFeedPosts = function() {
    feedFactory.getPublicFeedPosts()
    .then(function(posts) {
      $scope.feedPosts = posts;
    });
  }
  $scope.getPrivateFeedPosts = function() {
    feedFactory.getPrivateFeedPosts()
    .then(function(posts) {
      $scope.feedPosts = posts;
    });
  }
  if ($scope.username) {
    $scope.getPrivateFeedPosts()
  } else {
    $scope.getPublicFeedPosts()
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) { $scope.modal = modal; });

  $scope.saveMission = function() {
    $scope.modal.hide();
  };
})

.factory('feedFactory', function($http) {
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

  var getPrivateFeedPosts = function() {
    console.log("hi")
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
});
