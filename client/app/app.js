angular.module('app', [
  'ui.router',
  'ngFileUpload'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/all');

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
      url: '/pledge/:pledgename',
      templateUrl: '/views/feed.pledge.html',
      controller: 'FeedController'
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
    .state('user.post', {
      url: '/post',
      templateUrl: '/views/post.html',
    })
    .state('user.post.add', {
      url: '/new',
      templateUrl: '/views/post.add.html',
      controller: 'addPostController'
    })
    .state('user.post.view', {
      url: '/:post_id',
      templateUrl: '/views/post.view.html',
      controller: 'viewPostController'
    })
    .state('user.pledge', {
      url: '/:pledgename',
      templateUrl: '/views/user.pledge.html',
      controller: 'UserPledgeController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'AuthController'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: '/views/signup.html',
      controller: 'AuthController'
    })
})

.controller('MainController', function($scope) {

});
