(function(){
  'use strict';

  angular.module('kwik-task')
  .controller('HomeCtrl', ['$scope', 'Home', function($scope, Home){
    $scope.title = 'Home';
  }]);
})();

