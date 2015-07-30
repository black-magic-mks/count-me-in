angular.module('app')

.factory('subscribe', function($http) {
  var subscribeToPledge = function(pledgename, callback) {
    $http.post('/api/pledge/subscribe', {pledgename: pledgename})
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error status with subscribeToPledge: ', status, data, headers, config);
    });
  };

  var hasSubscribed = function(pledgename, callback) {
    $http.get('/api/pledge', {
      params: {pledgename: pledgename}
    })
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error status with hasSubscribed: ', status, data, headers, config);
    });
  };

  return {
    subscribeToPledge: subscribeToPledge,
    hasSubscribed: hasSubscribed
  }
})
