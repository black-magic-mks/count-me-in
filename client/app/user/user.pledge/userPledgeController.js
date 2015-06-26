angular.module('app')

.controller('UserPledgeController', function($scope, subscribe) {

  $scope.subscribedPledges = [];

  $scope.subscribePledge = function() {
    subscribe.subscribeToPledge($scope.pledgename, $scope.mission, function(data) {
      $scope.subscribedPledges = $scope.subscribedPledges.push (data);
      console.log('subscribedPledges: ', data, $scope.subscribedPledges);
    });
  };
})
.factory('subscribe', function($http) {
  var subscribeToPledge = function(pledgename, mission, callback) {
    console.log('pledgename: ', pledgename);
    console.log('mission: ', mission);
    $http.post('/api/pledge/subscribe', {pledgename: pledgename, mission: mission})
    .success(function(data, status, headers, config) {
      callback(data);
      console.log('subscribeToPledge data: ', data);
    })
    .error(function(data, status, headers, config) {
      console.log('error status with subscribeToPledge: ', status, data, headers, config);
    });
  };

  return {
    subscribeToPledge: subscribeToPledge
  }

});