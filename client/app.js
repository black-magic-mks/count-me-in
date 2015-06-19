angular.module('app', [
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/feed');
  $stateProvider
    .state('feed', {
      url: '/feed',
      templateUrl: '/views/feed.html',
      controller: 'FeedController'
    })
    .state('pledge', {
      url: '/pledge/:pledgename',
      templateUrl: '/views/pledge.html',
      controller: 'PledgeController'
    })
    .state('user', {
      url: '/user/:username',
      templateUrl: '/views/user.html',
      controller: 'UserController'
    })
    .state('user.pledge-list', {
      templateUrl: '/views/user-pledge-list.html',
      controller: 'UserPledgeListController'
    })
    .state('user.pledge', {
      templateUrl: '/views/user-pledge.html',
      controller: 'UserPledgeController'
    })
    .state('user.post', {
      url: '/user/:username/post/new',
      templateUrl: '/views/user-post.html',
      controller: 'UserPostController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/views/signup.html',
      controller: 'SignupController'
    })
})

.controller('MainController', function($scope) {

});