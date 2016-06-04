var login = angular.module("login",["Lib"]);

login.service('loadloginPage',function($http){
    var service = {
    }
    return service;
});

login.controller("loginCtr",["$scope",function($scope){
    $scope.selectlogin = function(type,e){
    	$(e.currentTarget).parent().find('div').removeClass('loginselect');
    	$(e.currentTarget).addClass('loginselect');
    	//0登录 1注册
    	if(type == 0){

    	}
    }
    TouchSlide({ 
        slideCell:"#swipecode",
        autoPage:true,
        titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        mainCell:".bd ul", 
        effect:"leftLoop", 
        autoPlay:true,//自动播放
        autoPage:true, //自动分页
        interTime:5000
    });
}]);