var index = angular.module("index",["Lib"]);

index.service('loadindexPage',function($http){
    var service = {
    }
    return service;
});
//轮播指令
index.directive('swipeCode', function(){
    return {
        restrict:'E',
        template:
            '<div id="swipecode">'+
                '<div class="hd">'+
                	'<span class="prev"><img src="img/sohu-prev.png"/></span>'+
					'<span class="next"><img src="img/sohu-next.png"/></span>'+
                    '<ul><li></li></ul>'+
                '</div>'+
                '<div class="bd">'+
                    '<ul>'+
                    	'<li ng-repeat="module in swipemoudles"><img src="img/bannner.png" /></li>'+
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
//职位&地区
index.directive('positionArea', function(){
    return {
        restrict:'E',
        template:
            '<div class="positionarea">'+
                '<div class="position">'+
                    '<div>职位</div>'+
                    '<a>促销导购</a>'+
                    '<a>促销导购</a>'+
                    '<a>促销导购</a>'+
                    '<a>促销导购</a>'+
                    '<a>促销</a>'+
                '</div>'+
                '<div class="area">'+
                    '<div>地区</div>'+
                    '<a>促销导购</a>'+
                    '<a>促销导购</a>'+
                    '<a>促销导购</a>'+
                    '<a>促销导购</a>'+
                    '<a>促销</a>'+
                '</div>'+
            '</div>',
        scope:{
        },
        link:function(scope,element,attr){
            
        }
    }
});
//筛选em
index.directive('selectEm', function(){
    return {
        restrict:'E',
        template:
            '<div class="selectback"></div>'+
			'<div class="selectem"></>'+
				'<div class="selectemdiv1">'+
					'<div>日结</div><div>提成</div><div>小时工</div>'+
				'</div>'+
				'<div class="selectemdiv2">'+
					'<div class="selectfabu">最新发布</div><div>推荐排序</div><div>工资最高</div>'+
				'</div>'+
			'</div>',
        scope:{
        },
        link:function(scope,element,attr){
            $('.selectemdiv2').delegate("div","click",function(e){
            	$(e.currentTarget).parent().find('div').removeClass('selectfabu');
            	$(e.currentTarget).addClass('selectfabu');
            });

        }
    }
});
index.controller("indexCtr",["$scope",function($scope){
    
}]);