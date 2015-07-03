angular.module('app')

.controller('addPledgeController', function($scope, $http, $state) {

  $scope.pledgenameValidation = /^[a-zA-Z0-9\-_]{0,40}$/;

  $scope.addPledge = function() {
    var pledgeData = {
      pledgename: $scope.pledge.pledgename,
      mission: $scope.pledge.mission
    };

    $http({
      method: 'POST',
      url: '/api/pledge/new',
      data: pledgeData,
    })
    .then(function(response) {
      $state.go('user.pledge.view', {pledgename: response.data.pledgename});
    });

  };

  $scope.cancelPledge = function() {
    console.log('in cancelPledge');
    $state.go('user.post.add');
  };

});

