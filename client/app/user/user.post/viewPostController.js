angular.module('app')

.controller('viewPostController', function($scope, $http, $state) {
  $scope.title = 'Dummy Title of Post';
  $scope.awsUrl = 'https://s3.amazonaws.com/count-me-in-black-magic/mengel/1435174189372/Screenshot+2015-06-14+19.28.44.png';
});
