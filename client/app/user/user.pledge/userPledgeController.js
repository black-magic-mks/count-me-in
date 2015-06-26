angular.module('app')

.controller('UserPledgeController', function($scope, UserPledgeFactory, subscribe) {

  // TODO: replace null with pledgename the user is subscribing to
  UserPledgeFactory.getUserPledgeData(null, function(data) {
    $scope.pledgename = data.pledgename;
  });

  $scope.subscribedPledges = [];

  $scope.subscribePledge = function() {
    subscribe.subscribeToPledge($scope.pledgename, function(data) {
      $scope.subscribedPledges = $scope.subscribedPledges.push (data);
      console.log('subscribedPledges: ', data, $scope.subscribedPledges);
    });
  };
})
.factory('UserPledgeFactory', function($http) {
  var getUserPledgeData = function(pledgename, callback) {
    console.log('pledgename start of getUserPledgeData: ', pledgename);
    $http.get('/api/pledge/posts', {pledgename: pledgename})
    .success(function(data, status, headers, config) {
      callback(data);
      console.log('getUserPledgeData data: ', data);
    })
    .error(function(data, status, headers, config) {
      console.log('THIS IS THE PLEDGENAME IN ERROR: ', pledgename);
      console.log('error status with getUserPledgeData: ', status, data, headers, config);
    });
  };

  return {
    getUserPledgeData: getUserPledgeData
  }

})
.factory('subscribe', function($http) {
  var subscribeToPledge = function(pledgename, callback) {
    console.log('pledgename: ', pledgename);
    $http.post('/api/pledge/subscribe', {pledgename: pledgename})
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