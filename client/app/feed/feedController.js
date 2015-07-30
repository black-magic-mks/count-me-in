angular.module('app')

.controller('FeedController', function($scope, $rootScope, $timeout, feedFactory) {
  $scope.feedPosts = [];
  // uses promises to put the public data onto the scope
  $scope.getPublicFeedPosts = function() {
    feedFactory.getPublicFeedPosts()
    .then(function(posts) {
      if (posts) {
        for (var i = 0; i < posts.length; i++) {
          posts[i].created = moment.unix(posts[i].created / 1000).fromNow();
        }
      }
      $scope.feedPosts = posts;
    });
  }
  // uses promises to put the private data onto the scope
  $scope.getPrivateFeedPosts = function() {
    if ($rootScope.loggedIn) {
      feedFactory.getPrivateFeedPosts()
      .then(function(posts) {
        if (posts.length !== 0) {
          if (posts) {
            for (var i = 0; i < posts.length; i++) {
              posts[i].created = moment.unix(posts[i].created / 1000).fromNow();
            }
          }
          $scope.feedPosts = posts;
        } else {
          $scope.getPublicFeedPosts();
        }
      });
    }
  }

  // init function; feed will default to private feed if logged in and public feed if not
  $scope.init = function() {
    if ($scope.currentUser) {
      $timeout(function() {
        $scope.getPrivateFeedPosts();
      })
    } else {
      $timeout(function() {
        $scope.getPublicFeedPosts();
      })
    }
  }

  // initializes the post data
  $scope.init();

  // shows/toggles comment box
  $scope.boxVisible = false;

  $scope.showCommentBox = function () {
    $scope.boxVisible = true;
  }
})

.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
  }
});
