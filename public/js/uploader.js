angular.module('UploaderApp', ['ngRoute', 'angularFileUpload'])
.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'FilesCtrl',
		templateUrl: 'files.html'
	})
})
.service('fileService', function($http) {
	var files = [];

	this.update = function() {
		$http.get('api/files').success(function(data, status, headers, config) {
			files = data;
		}).error(function(data, status, headers, config) {
			console.log('there was an error...');
		});
	}

	this.list = function() {
		return files;
	}

	this.update();
})
.controller('UploadCtrl', ['$scope', '$upload', 'fileService', function($scope, $upload, fileService) {
	$scope.$watch('files', function() {
		$scope.upload($scope.files);
	});

	$scope.upload = function(files) {
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				$upload.upload({
					url: '/api/files',
					file: file,
				}).success(function(data, status, headers, config) {
					console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
					fileService.update();
				});
			}
		}
	};
}])
.controller('FilesCtrl', function($scope, fileService) {
	$scope.files = fileService.list();
});