angular.module('app')

.controller('PledgesController', function($scope, $http) {
  $scope.pledges = {};

  $http.get('/api/pledge/all')
  .success(function(data, status, headers, config) {
    console.log('data from api', data);

    $scope.pledges = data;
  })
  .error(function(data, status, headers, config) {
    console.log('error with get request for api/post');
  });

});
