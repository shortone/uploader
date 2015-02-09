angular.module('UploaderApp', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'FilesCtrl',
		templateUrl: 'files.html'
	})
})
.controller('FilesCtrl', function($scope, $http) {
	$http.get('api/files').success(function(data, status, headers, config) {
		$scope.files = data;
	}).error(function(data, status, headers, config) {
		console.log('there was an error...');
	});
});