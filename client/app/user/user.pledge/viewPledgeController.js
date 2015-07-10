angular.module('app')

.controller('viewPledgeController', function($scope, $stateParams, UserPledgeFactory, subscribe) {
  UserPledgeFactory.getUserPledgeData($stateParams.username).then(function(pledgeData) {
    $scope.userPledgePosts = pledgeData;
  });
  $scope.username = $stateParams.username;
  $scope.pledgename = $stateParams.pledgename;
})
.factory('UserPledgeFactory', function($http, $stateParams) {
  var getUserPledgeData = function(username) {
    return $http({
      method: 'GET',
      url: '/api/user/posts',
      params: {username: username}
    })
    .then(function(posts) {
      posts = posts.data.filter(function(postObject) {
        return postObject.pledgename === $stateParams.pledgename;
      })
      return posts[0].posts;
    })
    .catch(function(err) {
      console.error(err);
    })
  }

  return {
    getUserPledgeData: getUserPledgeData
  }

});

