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
	this.setFiles = function(f) {
		files = f;
	}
	this.getFiles = function() {
		return files;
	};
	this.update = function() {
		return $http.get('/api/files').then(function(response) {
			return response.data;
		});
	};
	this.delete = function(_id) {
		$http.delete('/api/files/' + _id);
	}
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
					fileService.update().then(function(files) {
						fileService.setFiles(files);
					});
				});
			}
		}
	};
}])
.controller('FilesCtrl', function($scope, fileService) {
	$scope.deleteFile = function(_id) {
		fileService.delete(_id);
		fileService.update().then(function(files) {
			$scope.files = files;
		});
	};

	$scope.files = fileService.getFiles();
	fileService.update().then(function(files) {
		$scope.files = files;
	});
	$scope.$watch(fileService.getFiles, function(files) {
		$scope.files = files;
	});
});