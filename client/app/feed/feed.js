angular.module('app')

.controller('FeedController', function($scope) {
  $scope.pledgeCategories = [{
    name: 'yolo',
    pledges: [{
      user: {
        mission: "sup bro",
        date: "09-18-1992",
        posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
      },
      user: {
        mission: "sup bro",
        date: "09-18-1992",
        posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
      }
    }]
  },
  {
    name: 'Hello',
    pledges: [{
      user: {
        mission: "sup bro",
        date: "09-18-1992",
        posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
      },
      user: {
        mission: "sup bro",
        date: "09-18-1992",
        posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
      }
    }]
  }]
});
