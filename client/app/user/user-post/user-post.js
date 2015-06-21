angular.module('app')

.controller('UserPostController', function($scope, Upload) {
  $scope.$watch('files', function () {
      $scope.upload($scope.files);
  });

  $scope.upload = function () {
    console.log('in upload');
    var files = $scope.post.files;
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: 'upload/url',
            fields: {'username': $scope.username},
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          });
      }
    }
  };
});
