angular.module('app')

.controller('FeedController', function($scope, feedFunc) {
  angular.extend($scope, feedFunc);
  $scope.getFollowedPledges('mengel');
  $scope.getPledgePosts('code');
})
.factory('feedFunc', function($http) {
  var pledgeCategories = [];
  var userPledges = [];
  var getFollowedPledges = function(username) {
    $http.get('/api/user/pledges', {
      params: {username: username}
    }).
    success(function(data, status, headers, config) {
    }).
    error(function(data, status, headers, config) {
      console.log('error with get request for api/user/pledges');
    });
  }

  var getPledgePosts = function(pledgename) {
    console.log('pledgename',pledgename);
    $http.get('/api/pledge/posts', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {

    }).
    error(function(data, status, headers, config) {
      console.log('error with get request for api/pledge/posts',data,status,headers,config);
    });
  }  
  
  return {
    getFollowedPledges: getFollowedPledges,
    getPledgePosts: getPledgePosts
  }
});

 