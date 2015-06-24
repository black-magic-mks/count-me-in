angular.module('app')

.controller('UserAddPostController', function($scope, $http, $state) {

  $scope.addPost = function() {
    var fd = new FormData();
    fd.append('file', $('.post-file')[0].files[0], 'image');
    fd.append('title', $scope.post.title);
    fd.append('text', $scope.post.text);
    fd.append('pledgeName', $scope.post.pledgeName);


    var file = document.getElementById("user-post-add").files[0];
    var postData = {
      username: 'mengel',
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
      console.log('xhr is ', xhr, ' and file and signed request are ', file, signed_request);
      xhr.open("PUT", signed_request)
      xhr.setRequestHeader('x-amz-acl', 'public-read')
      xhr.onload = function() {
        if (xhr.status === 200) {
          done(url)
        }
      }
      xhr.send(file)
    }

    $http({
      method: 'POST',
      url: '/api/post/new',
      data: postData,
    })
    .then(function(response) {
      console.log('response is ', response);
      upload(file, response.data.signed_request, response.data.url, function(url) {
        // to preview after upload document.getElementById("preview").src = response.data.url
        console.log('image is at: ', response.data.url);
        $state.go('tab.user.dashboard');
      })
    })
  }
});
