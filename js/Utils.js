/**
 * 获取url中的参数
 * @param name
 * @returns {*}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return r[2];
    return null; //返回参数值
};
/**
 * 设置和获取cooke中的值
 */
function handleCookie(){}
handleCookie.prototype.getCookie = function(c_name){
    if (document.cookie.length>0){
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    return "";
 }

handleCookie.prototype.setCookie = function(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
/**
 * 下拉加载插件
 */
function pullscrollutil(){}
pullscrollutil.prototype.pullscrollIn = function(isdom,divid,ulid,httprequest,litemplate,secallback,overnum,pageNo,param_1,param_2,param_3,param_4,param_5,param_6,param_7){
     //参数分别是 是否用原生滚动条false用的是overflow 列表外层divid 内层ulid http请求 填充好的模板 模板元素是tr还是li 请求成功后需要处理的回调函数 多少条以内禁止加载显示到底但不包括当前数量
    var _start = 0;
    var _end = 0;
    var _csslist = {};
    var _jqcontent = $("#"+divid);
    var _jqcontent1 = $("#"+ulid);
    var _content = document.getElementById(divid);
    var _content1 = document.getElementById(ulid);
    //此处touch事件为全局变量
    pullrefresh_stoptouch = false;//是否禁用touch功能
    pullrefresh_ispull = true;//是否可以下拉
    $(_content).unbind("touchstart");
    $(_content).unbind("touchmove");
    $(_content).bind("touchstart", touchStart);
    $(_content).bind("touchmove", touchMove);
    _template = 
            '<div id="slideDown0" class="slideDownDiv">' +
                '<p>正在加载 ...</p>'+
            '</div>' +
            '<div id="slideDown1" class="slideDownDiv" style="display:none;">' +
                '<p>已经到底了<div></div></p>' +
            '</div>';
    _csslist._cssslideDown = { 
        "text-align":"center",
        "font-size":"15px",
        "position":"relative",
        "bottom":0,
        "color":"#C7C7C7",
        "display":"none",
        "height":"30px",
        "width":"100%",
        "background-color":"rgb(244, 245, 248)",
    };
    _csslist._cssslideDown0={
        "position":"fixed",
        "bottom":0,
        "color":"#C7C7C7",
        "display":"none",
        "height":"30px",
        "width":"100%",
        "background-color":"rgb(244, 245, 248)",
    }
    _csslist._cssp = { 
        "padding-top":"1%"
    };
    $('#'+divid).find('#slideDown').children().remove();
    $('#'+divid).find('#slideDown').append($(_template));
    $('#'+divid).find('#slideDown0').css(_csslist._cssslideDown0);    
    $('#'+divid).find('#slideDown').css(_csslist._cssslideDown);        
    $('#'+divid).find(".slideDownDiv p").css(_csslist._cssp);
    //由于部分手机不支持touchend属性，所以改成方法
    function _touchEnd(event){  
        if(!pullrefresh_stoptouch){
                function _httpsuccess(data){
                    var newdata = secallback(data);
                    for(var i=0;i<newdata.length;i++){
                            $("#"+ulid).append(litemplate(newdata[i]));
                    } 
                    if(newdata.length < overnum||newdata.length == 0){
                        pullrefresh_stoptouch = true;
                    }else{
                        pullrefresh_stoptouch = false;
                    }                         
                    setTimeout(function(){
                        $('#'+divid).find("#slideDown0").css("display","none");
                        if($('#'+divid).find("#slideDown1").css("display")=='block'){
                            $('#'+divid).find("#slideDown").css("display","block");
                        }else{
                            $('#'+divid).find("#slideDown").css("display","none");
                        }
                    },300);
                   pullrefresh_ispull = true; 
                }
                //正在刷新时ispull为false刷新完为true
                if(pullrefresh_ispull == true){
                        pageNo+=1;
                        httprequest(pageNo,param_1,param_2,param_3,param_4,param_5,param_6,param_7).success(function (data) {
                            //测试
                            //_httpsuccess(data);
                            if(data.code != 401&&data.code==200){
                                _httpsuccess(data);
                            }else{
                                $('#'+divid).find("#slideDown").css("display","none");
                                pullrefresh_ispull = true; 
                            }
                        }).error(function(data, status, headers, config){
                            $('#'+divid).find("#slideDown").css("display","none");
                            pullrefresh_ispull = true; 
                        });
                }    
                //正在刷新不允许下拉
                if($('#'+divid).find("#slideDown").css("display")=='block'){
                    pullrefresh_ispull = false;
                } 
        }
    }
    function slideDownStep1(dist,inul){  // dist 下滑的距离，用以拉长背景模拟拉伸效果 
        if(pullrefresh_ispull){
            //下滑才执行操作 
            if(dist > 1){
                if(!pullrefresh_stoptouch){
                    $('#'+divid).find("#slideDown0").css("display","block");
                    $('#'+divid).find("#slideDown").css("display","block");
                    _touchEnd();
                }else{
                    if(inul.children().length == 0){
                        $('#'+divid).find("#slideDown1").css("display","none");
                        $('#'+divid).find("#slideDown").css("display","none");
                    }else{
                        $('#'+divid).find("#slideDown1").css("display","block");
                        $('#'+divid).find("#slideDown").css("display","block");
                    } 
                }
            } 
        }         
    } 
    function touchStart(event){  
        //保证第一次页面下拉数量也受控制
        if($("#"+ulid).children().length<overnum){
            pullrefresh_stoptouch = true;
        }
        var touch = event.originalEvent.touches[0]; 
        _start = touch.screenY;         
    } 
    function touchMove(event){  
            var touch = event.originalEvent.touches[0]; 
            _end = (_start - touch.screenY); 
            if(isdom){
                if(document.body.scrollHeight-document.body.clientHeight-document.body.scrollTop <=1){
                    slideDownStep1(_end,_jqcontent1);
                }
            }else{
                if(_jqcontent1.height()-_jqcontent.height()-_jqcontent.scrollTop() <=1){
                    slideDownStep1(_end,_jqcontent1);
                }  
            }       
    } 
}
/**
 *微信JSSDK
 */
function weixinsdk(){
    this.bindWeixinShare = function(param,content){   //绑定微信分享事件
        if(navigator.userAgent.match(/MicroMessenger/igm)){
            if(!content){
                window.weixin_share ={
                    "title":'邀请你体验优mall，10元现金红包好礼等你来拿~',
                    "description":'现在加入优mall，送钱了~10元通用电子券一张，手机支付直接抵扣现金10元！还有众多好礼优惠等你哟~',
                    "img":'http://t.shoppingm.cn/wap/img/shoppingm_mall_logo.png',
                    "link":window.location.href
                };
            }else{
                window.weixin_share ={
                    "title":(!content.shareTitle||content.shareTitle == '') ?content.name:content.shareTitle,
                    "description":(!content.shareContent||content.shareContent == '') ?'我在用“优mall”手机客户端，这里有好多购物中心优惠活动，先到先得，不要错过哦！':content.shareContent,
                    "img":(!content.sharePath||content.sharePath == '')?'http://t.shoppingm.cn/wap/img/shoppingm_mall_logo.png':'http://onemall.ufile.ucloud.com.cn/'+content.sharePath,
                    "link":window.location.href
                };
            }


            wx.config({
                debug:false,
                appId: param.appId,
                timestamp: +param.timestamp,
                nonceStr: param.nonceStr,
                signature: param.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            });

            //微信分享触发
            wx.ready(function () {
                // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                var checkApi = '';
                wx.checkJsApi({
                    jsApiList: [
                        'getNetworkType',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ'
                    ],
                    success: function (res) {
                        //        var check = JSON.stringify(res);
                        checkApi = res.checkResult;
                    }
                });
                //监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareAppMessage({
                    title: weixin_share.title,
                    desc: weixin_share.description,
                    link: weixin_share.link,
                    imgUrl: weixin_share.img,
                    fail: function (res) {
                        alert('分享失败');
                    }
                });

                //监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareTimeline({
                    title: weixin_share.title,
                    link: weixin_share.link,
                    imgUrl: weixin_share.img,
                    fail: function (res) {
                        alert('分享失败');
                    }
                });


                //监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareQQ({
                    title: weixin_share.title,
                    desc: weixin_share.description,
                    link: weixin_share.link,
                    imgUrl: weixin_share.img,
                    trigger: function (res) {
                        if(!checkApi.onMenuShareQQ)
                        {
                            alert('您微信的版本太低，不能正常分享，请升级微信版本');
                        }
                    },
                    //complete: function (res) {
                    //    alert(JSON.stringify(res));
                    //},
                    fail: function (res) {
                        alert("分享失败");
                    }
                });
            });
        }
    }
    this.takeWeixinSign = function(callback,content){ //取微信二次分享签名
        var _this = this;
        $.ajax({
            method: 'POST',
            url:appConfigs.rootUrl+'/api/proms/signature',
            //url:'http://qa-t.shoppomgm.cn/api/proms/signature',
            //url:'http://172.16.13.36:8080//api/proms/signature',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {'url':encodeURIComponent(window.location.href.split('#')[0])},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).success(function (data, status, headers, config) {
            if(data.code == 200){
                var param = data.businessObj;
                _this.bindWeixinShare(param,content);
            }
            if(callback){
                callback();
            }
        }).error(function(data, status, headers, config){
            if(callback){
                callback();
            }
        })
    }
    this._weixinready = function(callback){
        if (typeof WeixinJSBridge == "undefined"){
           if( document.addEventListener ){
               document.addEventListener('WeixinJSBridgeReady', callback, false);
           }else if (document.attachEvent){
               document.attachEvent('WeixinJSBridgeReady', callback); 
               document.attachEvent('onWeixinJSBridgeReady', callback);
           }
        }else{
           callback();
        }
    }
    this._weixinpay = function(payobj,callback){
        function onBridgeReady(){
           WeixinJSBridge.invoke(
               'getBrandWCPayRequest', {
                   "appId" : payobj.appId,     //公众号名称，由商户传入     
                   "timeStamp": payobj.timeStamp,         //时间戳，自1970年以来的秒数     
                   "nonceStr" : payobj.nonceStr, //随机串     
                   "package" : payobj.packagepay,     
                   "signType" : "MD5",         //微信签名方式：     
                   "paySign" : payobj.paySign //微信签名 
               },
               function(res){    
                    callback(res);
               }
           ); 
        }
        this._weixinready(onBridgeReady);
    }
    this._weixinoptionhide = function(){
        function onBridgeReady(){
           WeixinJSBridge.call("hideOptionMenu"), WeixinJSBridge.call("hideToolbar");
        }
        this._weixinready(onBridgeReady);
    }
    this._weixinoptionshow = function(){
        function onBridgeReady(){
           WeixinJSBridge.call("showOptionMenu"), WeixinJSBridge.call("showToolbar");
        }
        this._weixinready(onBridgeReady);
    }
    this._weixinclosewindow = function(){
        function onBridgeReady(){
           WeixinJSBridge.invoke('closeWindow',{},function(res){});
        }
        this._weixinready(onBridgeReady);
    }
}
weixinsdk.prototype.init = function(callback,content){
        this.takeWeixinSign(callback,content);
};
weixinsdk.prototype.weixinpay = function(payobj,callback){
        this._weixinpay(payobj,callback);
};
weixinsdk.prototype.closewindow = function(){
        this._weixinclosewindow();
};
weixinsdk.prototype.weixinoptionhide = function(){
        this._weixinoptionhide();
};
weixinsdk.prototype.weixinoptionshow = function(){
        this._weixinoptionshow();
};
/**
 * data格式化
 * @param yyyy-MM-dd hh:mm:ss.S
 *
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
Date.prototype.NewDateFormat = function(date){
    var regTest = /^(\d{4})(\d{2})(\d{2})$/;
    if(regTest.test(date)){
        return date;
    }else{
        var oldate = new Date(date);
        return oldate.Format("yyyy-MM-dd");
    }
}
/**
 * 将number转换成Date
 *
 *
 */
Number.prototype.date = function() {
    return new Date(this);
};
/**
 * 校验手机号 验证码
 */
function checkInfo(){};
checkInfo.prototype.checkinno = function(val){
    if (!val.match(/^0?1[3-8][0-9]\d{8}$/)) { 
        return false; 
    }else{
        return true; 
    } 
};
checkInfo.prototype.checkincode = function(val){
    if (!val.match(/^\d{6}$/)) { 
        return false; 
    }else{
        return true; 
    } 
};
//仿照原生提示信息方法
function remind_warn(msg,delayMS) {
    $(document).find('#all-warn').remove();
    var tmp = '<div id="all-warn"></div>';
    $('body').append($(tmp));
    var warn = $('#all-warn');
    var delay = delayMS || 3000;
    warn.html('');
    var s ='<div class="all-warn-content">'+msg+'</div>';
    warn.html(s);
    warn.css({"display":"block"});
    _.delay(function(warn){
        warn.css({"display":"none"});
    }, delay, warn);
};
//增加input清空数据按钮
function clear_input_btn(id){
    $('#'+id).parent().find('label').click(function(){
        $('#'+id).val("");
        $('#'+id).parent().find('label img').css("display","none");
    });
    $('#'+id).unbind('input propertychange');
    $('#'+id).bind('input propertychange', function(e) {
        if($(e.target).val()!=''){
            $(e.target).parent().find('label img').css("display","block");
        }else{
            $(e.target).parent().find('label img').css("display","none");
        }
    }); 
}
/**
 *
 *  Secure Hash Algorithm (SHA256)
 *  http://www.webtoolkit.info/
 *
 *  Original code by Angel Marin, Paul Johnston.
 *
 **/

function SHA256(s){

    var chrsz   = 8;
    var hexcase = 0;

    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256 (m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb (str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));

}