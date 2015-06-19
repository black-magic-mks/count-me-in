angular.module('app', [
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/feed');
  $stateProvider
    .state('feed', {
      url: '/feed',
      templateUrl: '/feed/feed.html',
      controller: 'FeedController'
    })
    .state('pledge', {
      url: '/pledge/:pledgename',
      templateUrl: '/pledge/pledge.html',
      controller: 'PledgeController'
    })
    .state('user', {
      url: '/user/:username',
      templateUrl: '/user/user.html',
      controller: 'UserController'
    })
    .state('user.pledge-list', {
      templateUrl: '/user/user-pledge-list/user-pledge-list.html',
      controller: 'UserPledgeListController'
    })
    .state('user.pledge', {
      templateUrl: '/user/user-pledge/user-pledge.html',
      controller: 'UserPledgeController'
    })
    .state('user.post', {
      url: '/user/:username/post/new',
      templateUrl: '/user/user-post/user-post.html',
      controller: 'UserPostController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/auth/login.html',
      controller: 'LoginController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/auth/signup.html',
      controller: 'SignupController'
    })
})

.controller('MainController', function($scope) {

});