angular.module('app')

.controller('FeedController', function($scope, $ionicModal, feedFunc) {
  // angular.extend($scope, feedFunc);

  $scope.pledgeCategories = [
  {
   name: '#Coding',
   postList: [
     {
       user: "@Nathan",
       mission: "I don't know what I'm doing",
       date: "06-18-2015",
       posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
     },
     {
       user: "@Jack",
       mission: "I'm a bad person",
       date: "04-12-1792",
       posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
     }
   ]
 },
 {
   name: '#Piano',
   postList: [
     {
       user: "@Monica",
       mission: "I had a good idea today",
       date: "03-21-1992",
       posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
     },
     {
       user: "@Antonio",
       mission: "Jack is a bad person",
       date: "09-31-1992",
       posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
     }
   ]
 }
 ];

  $scope.pledgeCategories = [];
  $scope.graphData = {};
  $scope.graphData.posts = [];

  feedFunc.getFollowedPledges(null, function(data) {
    console.log('getFollowedPledges', data);
  });

  feedFunc.getPledgePosts('code', function(data) {
    console.log('pledge-getPledgePosts', data);
    data.forEach(function(pledge) {
      // $scope.pledgeCategories.push()
    })
  });

  feedFunc.getPledgeView('piano', function(data) {
    console.log(data.createdAt);
    data.forEach(function(post) {
      $scope.graphData.name = 'piano';
      $scope.graphData.posts.push(post);
      console.log('$scope.graphData', $scope.graphData);
    })
    console.log('got back to controller', data);
  });
  
  // $scope.getFollowedPledges('mengel');
  // $scope.getPledgePosts('code');
  // $scope.getPledgeView('piano');

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) { $scope.modal = modal; });

  $scope.saveMission = function() {
    $scope.modal.hide();
  };

  $scope.viewPledge = function() {
    //pass in clicked element
    // feedFunc.getPledgeView();
    // console.log('viewPledge running');
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
    $http.get('/api/pledge', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for api/pledge/posts',data,status,headers,config);
    });
  }; 

  var getPledgeView = function(pledgename, callback) {
    $http.get('/api/pledge/posts', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      callback(data);

    }).error(function(data, status, headers, config) {
      console.log('effor with request');
    });
  } 
  
  return {
    getFollowedPledges: getFollowedPledges,
    getPledgePosts: getPledgePosts,
    getPledgeView: getPledgeView
  }
});

 