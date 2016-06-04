/**
 * Created by jinyiliang on 16/1/7.
 * 公共文件,包含配置信息,公共服务以及工具
 */
angular.module('Lib',[])
    .config(function($httpProvider){
        //var version = '2.5.6';
        //$httpProvider.defaults.headers.common['version'] = version;
    })
    .service('getUrlParam',function(){  //获取url参数服务
        var getParam = function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return r[2]; return null; //返回参数值
        }
        return getParam;
    })
    .service('buttonStyle',function(){  //增加全局点击按钮样式需要传入dom的current
        var showbuttonStyle = function(current,newcolor,oldcolor){
            $(current).css("background-color",newcolor);
            setTimeout(function(){
                $(current).css("background-color",oldcolor);
            },150);
        }
        return showbuttonStyle;
    })
    .factory('simpleAlert',function(buttonStyle){  //alert弹窗服务 
        return {
            _cfg:{
                _template:
                    '<div class="simalert">'+
                        '<div class="simalert_mask"></div>'+
                        '<div class="simalert_dialog">'+
                            '<div class="simalert_dialog_hd"><strong class="simalert_dialog_title"></strong></div>'+
                            '<div class="simalert_dialog_bd"></div>'+
                            '<div class="simalert_dialog_ft">'+
                                '<a  class="simalert_btn_dialog default0">取消</a>'+
                                '<a  class="simalert_btn_dialog default1">确定</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
            },
            init:function(title,content,code,istemplate){//第四个参数为传模板
                var _this = this;
                if(code == true){
                    setTimeout(function(){
                        $('.simalert').find('.default0').css('display','none');
                    },20)
                }
                if($('body').find('.simalert')[0]==undefined){
                    var template = $('body').append($(_this._cfg._template));
                    $(".simalert_dialog_ft").delegate("a","touchstart",function(e){
                        buttonStyle(e.target,"#f6f6f6","#fafafc");
                    });
                    $(".simalert_dialog_ft").delegate("a","click",function(e){
                        $(".simalert").css("display","none");
                    });
                }
                $('.simalert').find(".simalert_dialog_hd").text(title);
                if(istemplate!=undefined){
                    $('.simalert').find(".simalert_dialog_bd").children().remove();
                    $('.simalert').find(".simalert_dialog_bd").append(istemplate);
                }else{
                    $('.simalert').find(".simalert_dialog_bd").text(content);
                }
                $(".simalert").css("display","block");
            }
        };
    }).directive('menuTop', function(){
        return {
            restrict:'E',
            template:
                '<section>'+
                    '<div class="maxtopmenu">'+
                        '<div>'+
                            '<span><a href="">下载APP</a></span>'+
                            '<span><a href="">微信公众号</a></span>'+
                        '</div>'+
                    '</div>'+
                    '<div id="maintopmenu" class="maintopmenu">'+
                        '<div>少壮派</div>'+
                        '<div>'+
                            '<select class="menuselect">'+
                                '<option value="0" selected="selected">北京</option>'+
                                '<option value="1">上海</option>'+
                                '<option value="2">广州</option>'+                    
                            '</select>'+
                        '</div>'+
                        '<div>下载App</div>'+
                        '<div>找兼职</div>'+
                        '<div>专业团队</div>'+
                        '<div>发布职位</div>'+
                    '</div>'+
                '</section>',
            scope:{
            },
            link:function(scope, element, attrs){
                
            }
        }
    }).directive('menuLeft', function(){
        return {
            restrict:'E',
            template:
                '<div class="contentmenu">'+
                    '<li class="menuli{{$index==0?selectmenu:selectnull}}" ng-repeat="cell in menulist" ng-click="gotopage(cell.id,$event)">'+
                        '<div></div><span ng-bind="cell.name"></span>'+
                    '</li>'+
                '</div>',
            scope:{
            },
            link:function(scope, element, attrs){
                scope.selectmenu = ' selectmenu';
                scope.selectnull = '';
                scope.menulist = [{"id":"1","name":"我的工作"},{"id":"2","name":"我的团队"},{"id":"3","name":"个人资料"},{"id":"4","name":"我的钱包"},{"id":"5","name":"修改密码"}];
                scope.gotopage = function(id,e){
                    $(e.currentTarget).parent().find('.selectmenu').removeClass('selectmenu');
                    $(e.currentTarget).addClass('selectmenu');
                }
            }
        }
    });