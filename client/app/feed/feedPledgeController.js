angular.module('app')

.controller('FeedPledgeController', function($scope, $stateParams, feedPledgeFactory, subscribe) {
  $scope.pledgename = $stateParams.pledgename;
  $scope.subscribed = false;

  feedPledgeFactory.getFeedPledgePosts($scope.pledgename)
  .then(function(posts) {
    $scope.feedPledgePosts = posts;
  });

  $scope.hasSubscribed = function() {
    subscribe.hasSubscribed($scope.pledgename, function(data) {
      $scope.subscribed = data.hasSubscribed;
    });
  };

  $scope.hasSubscribed();

  $scope.subscribedPledges = [];

  $scope.subscribePledge = function() {
    subscribe.subscribeToPledge($scope.pledgename, function(data) {
      $scope.subscribedPledges.push(data);
    });
    $scope.subscribed = true;
  };
})
