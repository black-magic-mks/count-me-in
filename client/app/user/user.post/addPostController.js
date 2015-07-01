angular.module('app')

.controller('addPostController', function($scope, $http, $state) {

  $scope.pledgenames = [];
  $scope.loadingPost = false;
  
  var init = function() {
    $scope.getUsersPledges();
  };

  $scope.getUsersPledges = function() {

    $http.get('/api/user/pledges')
    .success(function(data, status, headers, config) {
      console.log('data from api', data);
      var pledgenames = [];
      for (var i = 0; i < data.length; i++) {
        pledgenames.push(data[i].pledgename);
      };
      $scope.pledgenames = pledgenames;
      $scope.pledgename = pledgenames[0];
    })
    .error(function(data, status, headers, config) {
      console.log('error with get request for api/post');
    });

  };

  $scope.cancelPost = function() {
    $state.go('user.dashboard');
  };

  $scope.fileChanged = function(event) {
    var files = event.target.files;
    console.log(files[0]);
    var fileName = files[0].name;
    $scope.$apply(function() {
      $scope.fileName = fileName;
    });
  };
  
  $scope.addPost = function() {

    var file = document.getElementById("user-post-add").files[0];
    var postData = {
      title: $scope.post.title,
      text: $scope.post.text,
      pledgename: $scope.post.pledgename,
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
        $state.go('tab.user.post.view', {post_id: response.data.id});
      })
    })
  }

  init();

});
