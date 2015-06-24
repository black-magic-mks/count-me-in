angular.module('app')

.controller('FeedController', function($scope, feedFunc) {
  angular.extend($scope, feedFunc);
  $scope.getFollowedPledges('therealest');
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
      // // Format data
      // pledgeCategories.push(data);
      console.log('getFollowedPledges :', data);
    }).
    error(function(data, status, headers, config) {
      console.log('error with get request for api/user/pledges');
    });
  }

  var getPledgePosts = function(pledgename) {
    console.log('getPledgePosts is called');
    $http.get('/api/pledge/posts', {
      params: {pledgename: pledgename}
    }).
    success(function(data, status, headers, config) {
      // userPledges.push(data);
      console.log('getpledgeposts :', data);
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

 