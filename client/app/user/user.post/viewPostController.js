angular.module('app')

.controller('viewPostController', function($scope, $http, $state, $stateParams) {
  $scope.title = 'Dummy Title of Post';
  $scope.awsUrl = 'https://s3.amazonaws.com/count-me-in-black-magic/mengel/1435174189372/Screenshot+2015-06-14+19.28.44.png';

  console.log('state params: ', $stateParams);
  // feedFunc.getPost($stateParams.post_id, function(data) {
  //   console.log('post data: ', data);
  // });

});

// .factory('viewPostFunc', function($http) {

//   var getPost = function(post_id) {
//     $http.get('/api/user/pledges', {
//       params: {post_id: post_id}
//     })
//     .success(function(data, status, headers, config) {
//       callback(data);
//     })
//     .error(function(data, status, headers, config) {
//       console.log('error with get request for api/user/pledges');
//     });
//   };
  
//   return {
//     getPost: getPost
//   }
// })
