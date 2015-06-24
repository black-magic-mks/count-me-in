angular.module('app')

.controller('AuthController', function($scope) {
  $scope.user = {};
  $scope.passwordValidation = /.*(\d(?=.*[A-Z])|[A-Z](?=.*\d)).*/;
 })

.controller('LoginController', function($scope) {

})

.controller('SignupController', function($scope) {

});
