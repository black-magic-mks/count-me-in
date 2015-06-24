angular.module('app')

.controller('UserPostController', function($scope, $http) {

  $scope.addPost = function() {
    var fd = new FormData();
    fd.append('file', $('.post-file')[0].files[0], 'image');
    fd.append('title', $scope.post.title);
    fd.append('text', $scope.post.text);
    fd.append('pledgeName', $scope.post.pledgeName);
    
    $http({
      method: 'POST',
      url: '/api/post/new',
      processData: false,
      data: fd,
      transformRequest:angular.identity,
      headers:{'Content-Type':undefined}
    });
  }
});
