var index = angular.module("index",["Lib"]);

index.service('loadindexPage',function($http){
    var service = {
    }
    return service;
});

index.controller("indexCtr",["$scope",function($scope){
    console.log(11111)
}]);