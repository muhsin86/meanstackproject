var courseApp = angular.module('courseApp', []);
courseApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/courses').success(function(response) {
    console.log("I got the data I requested");
    $scope.courselist = response;
    $scope.course = "";
  });
};

refresh();

$scope.addCourse = function() {
  console.log($scope.course);
  $http.post('/courses', $scope.course).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/courses/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/courses/' + id).success(function(response) {
    $scope.course = response;
  });
};  

$scope.update = function() {
  console.log($scope.course._id);
  $http.put('/courses/' + $scope.course._id, $scope.course).success(function(response) {
    refresh();
  })
};

}]);﻿
