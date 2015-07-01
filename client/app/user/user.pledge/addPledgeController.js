angular.module('app')

.controller('addPledgeController', function($scope, $http, $state) {

  $scope.addPledge = function() {
    var pledgeData = {
      pledgename: $scope.pledge.pledgename,
      mission: $scope.pledge.mission
    };

    // TODO: confirm correct back-end route
    $http({
      method: 'POST',
      url: '/api/pledge/new',
      data: pledgeData,
    })
    .then(function(response) {
      $state.go('tab.user.pledge.view', {pledgename: response.data.pledgename});
    });

  };

  $scope.cancelPledge = function() {
    console.log('in cancelPledge');
    $state.go('tab.user.post.add');
  };

});

