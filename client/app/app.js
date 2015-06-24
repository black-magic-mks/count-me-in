angular.module('app', [
  'ui.router',
  'ionic',
  'ngFileUpload'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/feed/all');

  $stateProvider
    .state('tab', {
      url: '',
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
    .state('tab.feed.all', {
      url: '/all',
      templateUrl: '/views/feed.all.html',
      controller: 'PledgeController'
    })
    .state('tab.feed.pledge', {
      url: '/pledge',
      templateUrl: '/views/feed.pledge.html',
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
    .state('tab.user.dashboard', {
      url: '/dashboard',
      templateUrl: '/views/user.dashboard.html'
    })
    .state('tab.user.post', {
      url: '/post',
      templateUrl: '/views/post.html',
    })
    .state('tab.user.post.add', {
      url: '/new',
      templateUrl: '/views/post.add.html',
      controller: 'addPostController'
    })
    .state('tab.user.post.view', {
      url: '/:post_id',
      templateUrl: '/views/post.view.html',
      controller: 'viewPostController'
    })
    .state('tab.user.pledge', {
      url: '/pledge/:pledgename',
      templateUrl: '/views/user.pledge.html',
      controller: 'UserPledgeController'
    })
    .state('tab.login', {
      url: '/login',
      views: {
        'tab-login': {
          templateUrl: '/views/login.html',
          controller: 'AuthController'
        }
      }
    })

    .state('tab.signup', {
      url: '/signup',
      views: {
        'tab-signup': {
          templateUrl: '/views/signup.html',
          controller: 'AuthController'
        }
      }
    })
})

.controller('MainController', function($scope) {

});
