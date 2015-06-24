angular.module('app')

.controller('FeedController', function($scope) {
  $scope.pledgeCategories = [
  {
    name: 'Coding',
    postList: [
      {
        user: "@Nathan",
        mission: "I don't know what I'm doing",
        date: "06-18-2015",
        posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
      },
      {
        user: "@Jack",
        mission: "I'm a bad person",
        date: "04-12-1792",
        posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
      }
    ]
  },
  {
    name: '#Piano',
    postList: [
      {
        user: "@Monica",
        mission: "I had a good idea today",
        date: "03-21-1992",
        posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
      },
      {
        user: "@Antonio",
        mission: "Jack is a bad person",
        date: "09-31-1992",
        posts: ['https://thenypost.files.wordpress.com/2013/11/corgi.jpg','http://www.petguide.com/wp-content/uploads/2013/02/shiba-inu1.jpg']
      }
    ]
  }
  ]
});
