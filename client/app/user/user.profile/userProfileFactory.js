angular.module('app')

.factory('UserProfileFactory', function($http, $stateParams) {
  var getUserProfilePosts = function(username) {
    return $http({
      method: 'GET',
      url: '/api/user/posts',
      params: {username: username}
    })
    .then(function(pledges) {
      return pledges.data;
    })
    .catch(function(err) {
      console.log('error in UserProfileFactory: getUserProfilePledges()');
    })
  }

  return {
    getUserProfilePosts: getUserProfilePosts
  }
})
