angular.module('app')
.directive('feedPledge', function() {
  return {
    restrict: 'E',
    scope: {
      pledgeName: '=',
      pledgeList: '=',
      'nextPage': '&viewPledge'
    },
    templateUrl: './templates/feedPledge.html',
    link: function(scope, element, attr) {
        // scope.viewPledge = function() {
        //   console.log('hello world');
        // }
    };
      // console.log(viewPledge());
      // scope.viewPledge = function() { 
      //   console.log('hello world');
      // }
    }
  }
})
