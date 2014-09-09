(function(){
  'use strict';

  angular.module('kwik-task')
  .controller('TasksCtrl', ['$scope', 'Task', 'Priority', function($scope, Task, Priority){
    $scope.title = 'Tasks';
    $scope.task = {};
    $scope.tasks = [];
    $scope.priorities = [];
    $scope.sort = 'name';

    Task.all().then(function(response){
      $scope.tasks = response.data.tasks;
    });

    Priority.all().then(function(response){
      $scope.priorities = response.data.priorities;
    });

    $scope.add = function(){
      Task.create($scope.task).then(function(response){
        $scope.tasks.push(response.data.task);
        $scope.task = {};
      });
    };
  }]);
})();

