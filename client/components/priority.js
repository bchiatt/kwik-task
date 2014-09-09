(function(){
  'use strict';

  angular.module('kwik-task')
  .factory('Priority', ['$http', function($http){

    function create(priority){
      return $http.post('/priorities', priority);
    }

    function all(){
      return $http.get('/priorities');
    }

    return {create:create, all:all};
  }]);
})();

