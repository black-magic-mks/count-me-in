angular.module('app', [
  'ui.router',
  'ngFileUpload'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/feed/all');

  $stateProvider

    .state('feed', {
      url: '',
      templateUrl: '/views/feed.html',
    })
    .state('feed.all', {
      url: '/all',
      templateUrl: '/views/feed.all.html',
      controller: 'FeedController'
    })
    .state('feed.pledge', {
      url: '/pledge',
      templateUrl: '/views/feed.pledge.html',
      controller: 'PledgeController'
    })
    .state('user', {
      url: '/user/:username',
      templateUrl: '/views/user.html',
      controller: 'UserController'
    })
    .state('user.dashboard', {
      url: '/dashboard',
      templateUrl: '/views/user.dashboard.html'
    })
    .state('user.addPost', {
      url: '/post/new',
      templateUrl: '/views/user.addPost.html',
      controller: 'UserAddPostController'
    })
    .state('user.pledge', {
      url: '/pledge/:pledgename',
      templateUrl: '/views/user.pledge.html',
      controller: 'UserPledgeController'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'AuthController'
    })

    .state('tab.signup', {
      url: '/signup',
      templateUrl: '/views/signup.html',
      controller: 'AuthController'
    })
})

.controller('MainController', function($scope) {

});
