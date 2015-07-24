angular.module('app')

.controller('UserProfileController', function($scope, $stateParams, $rootScope, UserProfileFactory, follow) {
  $scope.username = $stateParams.username || $rootScope.currentUser;
  UserProfileFactory.getUserProfilePosts($scope.username)
  .then(function(pledges) {
    pledges.sort(function(pledge1, pledge2) {
      return pledge2.posts[0].created - pledge1.posts[0].created;
    })
    $scope.profilePledges = pledges;
  })
  $scope.addFollower = function() {
    console.log($stateParams)
    follow.followUser($stateParams.username);
  };
})
