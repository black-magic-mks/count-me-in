angular.module('app')

.controller('UserController', function($scope) {
  $scope.username = 'monica';

  $scope.pledgePreview = [
  {
    pledgeName: '#piano',
    missionStatement: 'I am the next Beethoven',
    coverImage: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR-waahz4-t7vaUVwUeRdyjPbeC_vcbqM_Soc00ser2RcgcDVrY',
    images: ['http://lh4.ggpht.com/_9F9_RUESS2E/SpkreUwhqHI/AAAAAAAAA7A/GomUBZzRjPQ/s800/20-Bizarre-Dog-Haircuts-18.jpg', 'http://thewowstyle.com/wp-content/uploads/2015/04/funny-dog-pics37.jpg'],
    lastDesc: 'I practiced piano yesterday for so long that my fingers fell off. But really.'
  },
  {
    pledgeName: '#lifting',
    missionStatement: 'Lifting and Protein',
    coverImage: 'http://www.lovethispic.com/uploaded_images/37623-Cute-Dog.jpg',
    images: ['http://lh4.ggpht.com/_9F9_RUESS2E/SpkreUwhqHI/AAAAAAAAA7A/GomUBZzRjPQ/s800/20-Bizarre-Dog-Haircuts-18.jpg', 'http://thewowstyle.com/wp-content/uploads/2015/04/funny-dog-pics37.jpg'],
    lastDesc: 'I went to the gym for 3 hours yesterday to lift.'
  },

  ]

});