angular.module('app')

.controller('UserPledgeController', function($scope, UserPledgeFactory) {
  $scope.userPledgePosts = UserPledgeFactory.getUserPledgeData();
})
.factory('UserPledgeFactory', function($http, $stateParams) {
  var getUserPledgeData = function() {
    return $http({
      method: 'GET',
      url: '/api/pledge/posts',
      params: {pledgename: $stateParams.pledgename}
    })
    .success(function(data) {
      data = data.filter(function(postObj) {
        return postObj.username === $stateParams.username;
      }).sort(function(postObj1, postObj2) {
        return postObj1.createdAt - postObj2.createdAt;
      })
      return data;
    })
    .catch(function(err) {
      console.error(err);
    })
  }

  return {
    getUserPledgeData: getUserPledgeData
  }

})

