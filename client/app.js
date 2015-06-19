angular.module('app', [
  'ui.router',
  'ionic'
])

.config(function($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/tab/feed');
  
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'views/tabs.html'
    })
    .state('tab.feed', {
      url: '/feed',
      views: {
        'tab-feed': {
          templateUrl: '/views/feed.html',
          controller: 'FeedController'
        }
      }
    })
    .state('pledge', {
      url: '/pledge/:pledgename',
      templateUrl: '/views/pledge.html',
      controller: 'PledgeController'
    })
    .state('tab.user', {
      url: '/user/:username',
      views: {
        'tab-user': {
          templateUrl: '/views/user.html',
          controller: 'UserController'
        } 
      }
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
      views: {
        'tab-user.post': {
          templateUrl: '/views/user-post.html',
          controller: 'UserPostController'        
        }
      }
    })
    .state('tab.login', {
      url: '/login',
      views: {
        'tab-login': {
          templateUrl: '/views/login.html',
          controller: 'LoginController'
        } 
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/views/signup.html',
      controller: 'SignupController'
    })
})

.controller('MainController', function($scope) {

});