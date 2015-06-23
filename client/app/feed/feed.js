angular.module('app')

.controller('FeedController', function($scope, feedFunc) {
  angular.extend($scope, feedFunc);
  $scope.username = 'therealest';
  $scope.pledgename = 'coding';
  $scope.getFollowedPledges($scope.username);
  $scope.getPledgePosts($scope.pledgename);
  
})
.factory('feedFunc', function($http) {
  var pledgeCategories = [];
  var userPledges = [];
  var getFollowedPledges = function(username) {
    console.log('hi');
    $http.get('/api/user/pledges', {
    params: {username: username}
    }).
    success(function(data, status, headers, config) {
      // Format data
      pledgeCategories.push(data);
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log('error with get request for api/user/pledges');
    });
  }

  var getPledgePosts = function(pledgename) {
    $http.get('/api/pledge/posts', {
      params: {pledgename: pledgename}
    }).
    success(function(data, status, headers, config) {
      userPledges.push(data);
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log('error with get request for api/pledge/posts');
    });
  }  
  
  return {
    getFollowedPledges: getFollowedPledges,
    getPledgePosts: getPledgePosts
  }
});

 