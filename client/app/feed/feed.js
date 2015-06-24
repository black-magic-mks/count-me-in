angular.module('app')

.controller('FeedController', function($scope, $ionicModal, feedFunc) {
  angular.extend($scope, feedFunc);

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
  $scope.graphData = {
    name: '#Coding',
    posts: [{
      username: '@Nathan',
      date: '1-2-11',
      text: 'sup bro. hello. hello. hello. hello. hello. hello. hello. hello. hello',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfF7olOL9BDXN1uWdT2yd4ldgXJo7rbd0OTO0oGuYFHlw1dXjr-Q'
    },
    {
      username: '@Shaan',
      date: '1-2-21',
      text: 'yo man. hello. hello. hello. hello. hello. hello. hello',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfF7olOL9BDXN1uWdT2yd4ldgXJo7rbd0OTO0oGuYFHlw1dXjr-Q'
    }
  ]};

  $scope.getFollowedPledges('mengel');
  $scope.getPledgePosts('code');
  $scope.clickedPledge;

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
    console.log('viewPledge running');
  };
})

.factory('feedFunc', function($http) {
  var pledgeCategories = [];
  var userPledges = [];
  var getFollowedPledges = function(username) {
    $http.get('/api/user/pledges', {
      params: {username: username}
    })
    .success(function(data, status, headers, config) {
      console.log('getFollowedPages', data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for api/user/pledges');
    });
  };

  var getPledgePosts = function(pledgename) {
    $http.get('/api/pledge/posts', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      // userPledges.push(data);
      console.log('getPledgePosts', data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for api/pledge/posts',data,status,headers,config);
    });
  }; 

  var getPledgeView = function(pledgename) {
    $http.get('', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      console.log('success getting pledge posts');

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

 