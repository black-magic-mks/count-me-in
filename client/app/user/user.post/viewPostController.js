angular.module('app')

.controller('viewPostController', function($scope, $http, $state, $stateParams, viewPostFunc) {
  $scope.loadingPost = true;
  
  viewPostFunc.getPost($stateParams.post_id, function(postData) {
    $scope.title = postData.title;
    $scope.text = postData.text;
    $scope.awsUrl = postData.aws_url;
    $scope.created = postData.created;
    $scope.loadingPost = false;
  });

})

.factory('viewPostFunc', function($http) {

  var getPost = function(post_id, callback) {
    $http.get('/api/post', {
      params: {
        postId: post_id
      },
    })
    .success(function(data, status, headers, config) {
      console.log(data);
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
