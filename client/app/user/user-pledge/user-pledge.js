angular.module('app')

.controller('UserPledgeController', function($scope) {

  $scope.pledgeName = '#piano';

  $scope.userPledgePost = [
    {
      pledgeName: '#piano',
      postImage: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQML-YCZQd37bSgP3YiYB4dkgwTx40mJ_lpoAUHgwyLY_AuFM_GDw',
      number: 4,
      date: '4/17',
      text: 'This is a short description about what I did today that got me closer to my goal'
    },
    {
      pledgeName: '#piano',
      postImage: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQML-YCZQd37bSgP3YiYB4dkgwTx40mJ_lpoAUHgwyLY_AuFM_GDw',
      number: 3,
      date: '4/16',
      text: 'This is a short description about what I did today that got me closer to my goal'
    },
    {
      pledgeName: '#piano',
      postImage: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQML-YCZQd37bSgP3YiYB4dkgwTx40mJ_lpoAUHgwyLY_AuFM_GDw',
      number: 2,
      date: '4/14',
      text: 'This is a short description about what I did today that got me closer to my goal'
    },
    {
      pledgeName: '#piano',
      postImage: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQML-YCZQd37bSgP3YiYB4dkgwTx40mJ_lpoAUHgwyLY_AuFM_GDw',
      number: 1,
      date: '4/13',
      text: 'This is a short description about what I did today that got me closer to my goal'
    },
  ];

});