var login = angular.module("login",["Lib"]);

login.service('loadloginPage',function($http){
    var service = {
    }
    return service;
});
//顶部指令
login.directive('loginTop', function(){
    return {
        restrict:'E',
        template:
            '<div class="logintop">'+
				'<div class="logintopIn">'+
					'<div><a href="">少壮派</a><a href="">少壮不努力</a></div>'+
					'<div><a href="">下载App</a></div>'+
				'</div>'+
			'</div>',
		scope:{
        },
        link:function(scope,element,attr){
            
        }
    }
});
//轮播指令
login.directive('swipeCode', function(){
    return {
        restrict:'E',
        template:
            '<div id="swipecode">'+
                '<div class="hd">'+
                    '<ul><li></li></ul>'+
                '</div>'+
                '<div class="bd">'+
                    '<ul>'+
                    	'<li ng-repeat="module in swipemoudles"><span ng-bind="module"></span></li>'+
                    '</ul>'+
                '</div>'+
			'</div>',
		scope:{
        },
        link:function(scope,element,attr){
            scope.swipemoudles = [1,2,3,4];
            setTimeout(function(){
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
	        },100);
        }
    }
});
//登录注册指令
login.directive('loginBox', function(){
    return {
        restrict:'E',
        templateUrl:'js/login/template/loginbox.html',
        scope:{
        },
        link:function(scope,element,attr){
            scope.loginbtntext = '登录';
			scope.login = 0;
		    scope.selectlogin = function(type){
		    	//0登录 1注册
		    	if(type == 0){
		    		$(".loginselect").css("left","92px");
		    		scope.login = 0;
		    		scope.loginbtntext = '登录';
		    	}else{
		    		$(".loginselect").css("left","206px");
		    		scope.login = 1;
		    		scope.loginbtntext = '注册';
		    	}
		    }
        }
    }
});
//底部指令
login.directive('loginHeader', function(){
    return {
        restrict:'E',
        template:
            '<div class="loginheader">'+
				'<div><a href="">薪资绝对透明</a></div>'+
				'<div><a href="">团队兼职更安全</a></div>'+
				'<div><a href="">兼职也能做CEO</a></div>'+
			'</div>',
		scope:{
        },
        link:function(scope,element,attr){
            
        }
    }
});
login.controller("loginCtr",["$scope",function($scope){

}]);