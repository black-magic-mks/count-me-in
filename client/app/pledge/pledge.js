angular.module('app')

.controller('PledgeController', function($scope, $ionicModal) {
  $scope.graphData = {
    name: '#Coding',
    posts: [{
      username: '@Nathan',
      date: '1-2-11',
      text: 'sup bro. hello. hello. hello. hello. hello. hello. hello. hello. hello',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfF7olOL9BDXN1uWdT2yd4ldgXJo7rbd0OTO0oGuYFHlw1dXjr-Q'
    },
{
      username: '@Shaan',
      date: '1-2-21',
      text: 'yo man. hello. hello. hello. hello. hello. hello. hello',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfF7olOL9BDXN1uWdT2yd4ldgXJo7rbd0OTO0oGuYFHlw1dXjr-Q'
    }
    ]
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) { $scope.modal = modal; });

  $scope.saveMission = function() {
    $scope.modal.hide();
  }


});
