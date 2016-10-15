var todoApp = angular.module('todoApp', []);

todoApp.controller('todoController', function($scope, $http){
	$scope.formData = {};

	$http.get('/collections/todos').success(function(data){
		$scope.todos = data;
		
	}).error(function(error){
		console.log( error);
	});
	$scope.createTodo = function(){
		$http.post('/collections/todos', $scope.formData).success(function(data){
			$scope.formData  = {};
			$scope.todos =data;
			console.log(data);
		}).error(function(data){
			console.log(data);
		});
	}
	$scope.deleteTodo = function(item) {
	$http.delete('/collections/todos/' + item).success(function(data){
		$scope.todos = data;
			
	}).error(function(data){
		console.log(data )
	});
}

});