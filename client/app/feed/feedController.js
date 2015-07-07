angular.module('app')

.controller('FeedController', function($scope, $rootScope, feedFactory) {
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
        // could move this logic into the backend??
        if (posts) {
          for (var i = 0; i < posts.length; i++) {
            posts[i].created = moment.unix(posts[i].created / 1000).fromNow();
          }
        }
        $scope.feedPosts = posts;
      });
    }
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

  $scope.saveMission = function() {
    $scope.modal.hide();
  };

  // shows/toggles comment box
  $scope.boxVisible = false;

  $scope.showCommentBox = function () {
    $scope.boxVisible = true;
    console.log('showCommentBox');
  }
})

.factory('feedFactory', function($http) {
  // gets the posts for the public feed
  var getPublicFeedPosts = function() {
    return $http({
      method: 'GET',
      url: '/api/public/feed',
    })
    .then(function(posts) {
      return posts.data || [];
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
      return posts.data || [];
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



.controller('FeedPledgeController', function($scope, $stateParams, feedPledgeFactory, subscribe) {
  $scope.pledgename = $stateParams.pledgename;

  feedPledgeFactory.getFeedPledgePosts($scope.pledgename)
  .then(function(posts) {
    $scope.feedPledgePosts = posts;
  });

  $scope.hasSubscribed = function() {
    subscribe.hasSubscribed($scope.pledgename, function(data) {
      $scope.subscribed = data.hasSubscribed;
    });
  };

  $scope.hasSubscribed();

  $scope.subscribedPledges = [];

  $scope.subscribePledge = function() {
    subscribe.subscribeToPledge($scope.pledgename, function(data) {
      $scope.subscribedPledges.push(data);
    });
  };
})
.factory('feedPledgeFactory', function($http) {

  var getFeedPledgePosts = function(pledgename) {
    return $http({
      method: 'GET',
      url: '/api/pledge/posts',
      params: {pledgename: pledgename}
    })
    .then(function(posts) {
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

.factory('subscribe', function($http) {
  var subscribeToPledge = function(pledgename, callback) {
    $http.post('/api/pledge/subscribe', {pledgename: pledgename})
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error status with subscribeToPledge: ', status, data, headers, config);
    });
  };

  var hasSubscribed = function(pledgename, callback) {
    $http.get('/api/pledge', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error status with hasSubscribed: ', status, data, headers, config);
    });
  };

  return {
    subscribeToPledge: subscribeToPledge,
    hasSubscribed: hasSubscribed
  }
})

.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
  }
});
