angular.module('app')

.controller('addPostController', function($scope, $http, $state) {
  $scope.loadingPost = false;

  $scope.cancelPost = function() {
    $state.go('user.dashboard');
  };

  $scope.fileChanged = function(event) {
    var files = event.target.files;
    console.log(files[0]);
    var fileName = files[0].name;
    $scope.fileName = fileName;
  };
  
  $scope.addPost = function() {
    var fd = new FormData();
    fd.append('title', $scope.post.title);
    fd.append('text', $scope.post.text);
    fd.append('pledgeName', $scope.post.pledgeName);

    var file = document.getElementById("user-post-add").files[0];
    var postData = {
      title: $scope.post.title,
      text: $scope.post.text,
      pledgename: $scope.post.pledgeName,
      file: {
        name: file.name,
        type: file.type
      }
    }

    var upload = function (file, signed_request, url, done) {
      var xhr = new XMLHttpRequest()
      xhr.open("PUT", signed_request)
      xhr.setRequestHeader('x-amz-acl', 'public-read')
      xhr.onload = function() {
        if (xhr.status === 200) {
          done(url)
        }
      }
      xhr.send(file)
    }

    $scope.loadingPost = true;

    $http({
      method: 'POST',
      url: '/api/post/new',
      data: postData,
    })
    .then(function(response) {
      upload(file, response.data.signed_request, response.data.url, function(url) {
        $scope.loadingPost = false;
        $state.go('user.post.view', {post_id: response.data.id});
      })
    })
  }
});
