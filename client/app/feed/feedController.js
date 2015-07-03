angular.module('app')

.controller('FeedController', function($scope, feedFactory) {
  $scope.feedPosts = [];
  // uses promises to put the public data onto the scope
  $scope.getPublicFeedPosts = function() {
    feedFactory.getPublicFeedPosts()
    .then(function(posts) {
      // console.log('getPublicFeedPosts', posts);
      $scope.feedPosts = posts;
    });
  }
  // uses promises to put the private data onto the scope
  $scope.getPrivateFeedPosts = function() {
    feedFactory.getPrivateFeedPosts()
    .then(function(posts) {
    // console.log('getPrivateFeedPosts', posts);
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
      console.log('get public posts: ', posts);
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



.controller('FeedPledgeController', function($scope, $stateParams, feedPledgeFactory, subscribe) {
  $scope.pledgename = $stateParams.pledgename;

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

  feedPledgeFactory.getFeedPledgePosts($scope.pledgename)
  .then(function(posts) {
    $scope.feedPledgePosts = posts;
  });

  $scope.hasSubscribed = function() {
    console.log('in hasSubscribed in FeedPledgeController');
    subscribe.hasSubscribed($scope.pledgename, function(data) {
      $scope.subscribed = data;
    });
  };
  
  $scope.hasSubscribed();

  $scope.subscribedPledges = [];

  $scope.subscribePledge = function() {
    console.log('in subscribe pledge');
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
      console.log('posts', posts);
      // posts.data.comments.created = timeSince(posts.data.comments.created);
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
    $http.get('api/pledge/hasSubscribed', {pledgename: pledgename})
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
