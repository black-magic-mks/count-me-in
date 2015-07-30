angular.module('app', [
  'ui.router',
  'ngFileUpload'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/feed/all');

  $stateProvider
    .state('feed', {
      url: '/feed',
      templateUrl: '/views/feed.html',
      controller: 'FeedController',
      activetab: 'feed'
    })
    .state('feed.all', {
      url: '/all',
      templateUrl: '/views/feed.all.html',
      activetab: 'feed'
    })
    .state('feed.pledge', {
      url: '/pledge/:pledgename',
      templateUrl: '/views/feed.pledge.html',
      controller: 'FeedPledgeController',
      activetab: 'feed'
    })
    .state('pledges', {
      url: '/pledges',
      templateUrl: '/views/pledges.html',
      controller: 'PledgesController'
    })
    .state('user', {
      url: '/user',
      templateUrl: '/views/user.html',
      controller: 'UserController',
      activetab: 'user'
    })
    .state('user.profile', {
      url: '/:username/profile',
      templateUrl: '/views/user.profile.html',
      controller: 'UserProfileController',
      activetab: 'user'
    })
    .state('user.profile.following', {
      url: '/following',
      templateUrl: '/views/user.profile.html',
      activetab: 'user'
    })
    .state('user.post', {
      url: '/:username/post',
      templateUrl: '/views/post.html',
      activetab: 'user'
    })
    .state('user.post.add', {
      url: '/new',
      templateUrl: '/views/post.add.html',
      controller: 'addPostController',
      activetab: 'user'
    })
    .state('user.post.view', {
      url: '/:post_id',
      templateUrl: '/views/post.view.html',
      controller: 'viewPostController' // in feedController.js for now; make separate file when you can come up with a good name for the file or when we seperate things into factory and controller files
    })
    .state('user.pledge', {
      url: '/:username/:pledgename',
      templateUrl: '/views/user.pledge.html'
    })
    .state('user.pledge.add', {
      url: '/new',
      templateUrl: '/views/user.pledge.add.html',
      controller: 'addPledgeController'
    })
    .state('user.pledge.view', {
      url: '/view',
      templateUrl: '/views/user.pledge.view.html',
      controller: 'viewPledgeController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'authController',
      activetab: 'login'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/views/signup.html',
      controller: 'authController',
      activetab: 'login'
    })
});

