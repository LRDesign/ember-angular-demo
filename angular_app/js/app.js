var todoApp = angular.module('todoApp', ['ngResource']).config(
    ['$httpProvider', function($httpProvider) {
    var defaults = $httpProvider.defaults.headers;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]);

todoApp.factory('TodoList', function($resource){

  return $resource('http://localhost:3000/todos/:id',
    {id: '@id'},
    { get: {
        method:'GET',
        transformResponse: function(data) {
          return JSON.parse(data).todo;
        }
      },
      query: {
        method:'GET',
        isArray: true,
        transformResponse: function(data) {
          return JSON.parse(data).todos;
        }
      },
      save: {
        method: 'POST',
        transformRequest: function(data) {
          return JSON.stringify({'todo': data});
        },
        transformResponse: function (data) {
          return JSON.parse(data).todo;
        }
      }
    });
});

todoApp.controller('TodosController', function ($scope, TodoList) {
  $scope.todos = [];

  TodoList.query(function (todos) {
    $scope.todos = todos;
  });

  $scope.total = $scope.todos.length;

  $scope.$watchCollection('todos',function(todos, oldTodos) {
    $scope.total = todos.length;
  });

  $scope.abbreviation = function(todo) {
    return "["+ todo.name.slice(0,3) + "]";
  }

  $scope.add = function() {
    newTodo = new TodoList({
      name: $scope.new_name,
      priority: $scope.new_priority
    });
    newTodo.$save(function(todo) {
      $scope.todos.push(todo)
    });
  }

});

todoApp.directive('total', function() {
  return {
    template: 'Total Todos: {{total}}'
  };
})


