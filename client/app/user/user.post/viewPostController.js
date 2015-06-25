angular.module('app')

.controller('viewPostController', function($scope, $http, $state, $stateParams, viewPostFunc) {
  $scope.loadingPost = true;

  viewPostFunc.getPost($stateParams.post_id, function(postData) {
    $scope.title = postData.title;
    $scope.awsUrl = postData.aws_url;
    $scope.created = postData.created;
    $scope.loadingPost = false;
  });

})

.factory('viewPostFunc', function($http) {

  var getPost = function(post_id, callback) {
    console.log('in viewPostFunc, post_id: ', post_id);
    $http.get('/api/post', {
      params: {post_id: post_id}
    })
    .success(function(data, status, headers, config) {
      callback(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for api/post');
    });
  };
  
  return {
    getPost: getPost
  }
})
