/* 加载验证码 */
$(function () {
    $('#txtCheckCode,#txtCheck').focus(function () {
        if ($(this).siblings('a').length <= 0) {
            $(this).after('<a href="javascript:void(0);" onclick="ShowImgCode(\'imgVcode\')"><img title="点击更换验证码" id="imgVcode" class="imgvcode" src="/CheckImage.aspx" /></a>');
        }
        else {
            ShowImgCode('imgVcode');
        }
    })
})
function ShowImgCode(id) {
    $("#" + id).attr("src", "/CheckImage.aspx?t=" + new Date().getTime() + Math.random() * 10);
}
function ShowImgCodTwo(id) {
    $("#" + id).attr("src", "/pages/imgvcode.aspx?t=" + new Date().getTime() + Math.random() * 10);
}
function getImgVCodeVal(obj) {
    var vcode;
    if ($(obj).length > 0) {
        var vcode = $(obj).val();
        if (vcode.length > 0) {
            vcode = "0," + vcode;
        } else {
            vcode = "";
        }
    }
    else {
        vcode = "1,";
    }
    return vcode;
}

function CheckImgCode(vcode) {
    var ccode = false;
    if (vcode.length < 1) {
        ccode = false;
    }
    else {
        $.ajax({
            type: 'POST',
            async: false,
            url: '/Pages/CheckImgCode.aspx',
            dataType: 'text',
            data: { vcode: "" + vcode + "" },
            success: function (result) {
                if (result == "1") {
                    ccode = true;
                }
            },
            error: function () {
            }
        });
    }
    return ccode;
}

function inputsd(_this) {
    $(_this).siblings().hide();
}
function inputsr(_this) {
    if ($(_this).val().length <= 0) {
        $(_this).siblings().show();
    }
}

/*请稍后 加载中*/
function submittingpleasewait(msg, e) {
    var html = "<div class='loadingzhong'><div class='loadingzhongnr'><img src='/images/icons/loading9.gif'/><span>" + msg + "</span></div></div>";
    var e = $(e.target);
    if (e.is("input[type=button]")) {
        if (msg == "") {
            $('.loadingzhong').remove();
        }
        else {
            var _id = e.attr('id');
            var _thisid = $('#' + _id);
            var hi = _thisid.height() + 2;
            e.after(html);
            var hit = _thisid.css('border-top-width').replace('px', '');
            var hib = _thisid.css('border-bottom-width').replace('px', '');
            var mab = _thisid.css('margin-bottom').replace('px', '');
            var shi = parseInt(hi) + parseInt(hit) + parseInt(hib) + parseInt(mab); //高度+上下边框+ margin-bottom的总长度
            $(".loadingzhong").css({
                "width": "100%",
                "height": "50px",
                "top": -shi,
                "z-index": "9999",
                "background-color": "white",
                "vertical-align": "middle",
                "text-align": "center"
            })
        }
    } else {
        return false;
    }
}
/* 返回用户的COOKIE */
function getCookieUser() {
    var ucookie = getCookie("USER_LOGIN");

    if (ucookie == "null" || ucookie == null || ucookie == "undefined") {
        return null;
    } 
    return ucookie != null ? decodeURIComponent(ucookie) : null;
}

function setUser() {
    var UserId = JSON.parse(getCookie("USER_LOGIN"));
    var ucookieId = JSON.parse(getCookie("USERLOGINFX110"));
    if (UserId != null && ucookieId != null) {
        if (UserId.Uid != ucookieId.Uid) {
            $.ajax({
                type: 'POST',
                async: false,
                url: '/Account/LoginShare',
                dataType: 'json',
                data: "",
                success: function (data) {
                    UserId = getCookie("USERLOGINFX110");
                },
                error: function () { }
            });
        }
    }
    return UserId;
}

//图片集合
function getImageList() {
    var arrimginfo = new Array("", "");
    var imgms = $(".placeId_img").find(".Imgms");
    var imghtml = "";
    var imgidstr = "";
    var ImgJson = [];
    var imginfostr, imgs1, imgb1, imgmsvalue;
    for (var i = 0; i < imgms.length; i++) {
        imginfostr = imgms.eq(i).find(".hiddd").val().split("_");

        if (imginfostr[1].indexOf('Thumbnail') >= 0) {
            imgb1 = imginfostr[2];
            imgs1 = imginfostr[1];
        }
        else {
            imgb1 = imginfostr[1];
            imgs1 = imginfostr[2];
        }

        imgmsvalue = imgms.eq(i).find(".miaoshunr").val();
        if (imgmsvalue == "图片描述...") imgmsvalue = "";
        ImgJson.push({ "Small": imgs1, "Middle": imgs1, "Big": imgb1, "Description": imgmsvalue });
    }
    if (imgms.length <= 0) {
        return "";
    }
    else {
        return JSON.stringify(ImgJson);
    }
}

// 添加方法
function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function () { obj['e' + type + fn](window.event); }
        obj.attachEvent('on' + type, obj[type + fn]);
    } else
        obj.addEventListener(type, fn, false);
}
function removeEvent(obj, type, fn) {
    if (obj.detachEvent) {
        obj.detachEvent('on' + type, obj[type + fn]);
        obj[type + fn] = null;
    } else
        obj.removeEventListener(type, fn, false);
}
//json数组的兼容性处理
function jsonFn(data) {
    var d;
    try {
        d = eval("(" + data + ")");
    }
    catch (e) {
        d = data;
    }
    return d;
}

// 递归替换
function extend() {
    if (arguments.length < 1) {
        return {};
    }
    else if (arguments.length == 1) {
        return RecursionSubstitution({}, arguments[0])
    } else {
        var argObj = arguments[0];
        for (var ii = 1; ii < arguments.length; ii++) {
            argObj = RecursionSubstitution(argObj, arguments[ii]);
        }
        return argObj;
    }

    function RecursionSubstitution(c, f) {
        if (!c) c = {};
        for (var i in f) {
            if (f[i] && typeof f[i] == "object") {
                c[i] = RecursionSubstitution(c[i], f[i]);
            } else {
                c[i] = f[i];
            }
        }
        return c;
    }
}


//keycode 键盘监听
function viewKeyInfo(e) {
    var e = e || event;
    currKey = e.keyCode || e.which || e.charCode;
    return currKey;
}
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    }
    else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}



//判断是否是pc端
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//获取样式属性值
 function getStyle(obj, attr) {    
    var ie = !+"\v1";//简单判断ie6~8
    if (attr == "backgroundPosition") {//IE6~8不兼容backgroundPosition写法，识别backgroundPositionX/Y
        if (ie) {
            return obj.currentStyle.backgroundPositionX + " " + obj.currentStyle.backgroundPositionY;
        }
    }
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, null)[attr];
    }
 }



//Cookie
 function checkCookiefun() {
     if (!navigator.cookieEnabled) {
         alert("您的浏览器设置禁止使用cookie\n请设置您的浏览器，启用cookie功能，再重新登录。");
     } else {
         alert('cookie功能已启用');
     }
 }
 function getCookie(name) {
     try {
         var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
         if (arr = document.cookie.match(reg)) {
             //  return unescape(arr[2]);
             return decodeURIComponent(arr[2]);
         } else {
             return null;
         }
     } catch (e) { return null; }
 }
 function delCookie(name) {
     var exp = new Date();
     exp.setTime(exp.getTime() - 1);
     var cval = getCookie(name);
     if (cval != null)
         document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
 }
// s20是代表20秒
// h是指小时，如12小时则是：h12
// d是天数，30天则：d30
 function setCookie(name, value, time) {
     var strsec = getsec(time);
     var exp = new Date();
     exp.setTime(exp.getTime() + strsec * 1);
     document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
 }
 function getsec(str) {
     var str1 = str.substring(1, str.length) * 1;
     var str2 = str.substring(0, 1);
     switch (str2) {
         case "s": return str1 * 1000;
         case "m": return str1 * 60 * 1000;
         case "h": return str1 * 60 * 60 * 1000;
         default: return str1 * 24 * 60 * 60 * 1000;
     }
 }
 function SetCookieTomorrow(name, value) {
     var dd = new Date();
     var str = name + "=" + escape(value) + "|" + dd.toLocaleDateString();

     dd.setDate(dd.getDate() + 1);//获取明天 
     var y = dd.getFullYear();
     var m = dd.getMonth() + 1;//获取当前月份的日期
     var d = dd.getDate();
     date = new Date(y + '-' + m + '-' + d + ' 00:00:00');
     date.setTime(date.getTime());//明天的0:00:00
     str += ";expires=" + date.toGMTString() + ";path=/";
     document.cookie = str;
 }

 /* 获取链接的参数 */
 function GetQueryString(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r != null) return r[2];
     return null;
 }

 /* 获取链接hash后面的参数 */
 function GethashString(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var h = window.location.hash;
     var r = h.substr(h.lastIndexOf('?') + 1).match(reg);
     if (r != null) return r[2];
     return null;
 }

 /* 把中英文的长度都转成字符串行的长度    中文：2个字符    英文：1个字符 */
 function strlen(str) {
     var len = 0;
     for (var i = 0; i < str.length; i++) {
         var c = str.charCodeAt(i);
         //单字节加1   
         if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
             len++;
         }
         else {
             len += 2;
         }
     }
     return len;
 }


/* ajax请求
 data.dom   需要加loading的dom元素
*/
 function FxAjax(data) {
     var d;
     var isLoading = d.isLoading || true;
     if (typeof data === "string") {
         d = JSON.parse(data);
     }
     else {
         d = data;
     }
     $.ajax({
         type: d.type,
         url: d.url,
         dataType: d.dataType,
         data: d.data,
         complete: function (xhr, ts) {
             d.complete();
         },
         beforeSend: function () {
             d.isloading && FxLoading(d.loading).add();
             d.beforeSend();
         },
         success: function (data) {
             d.isloading && FxLoading(d.loading).remove();
             d.success();
         },
         error: d.error || function () {
             d.error();
         }
     })
 }

// 加载中的方法
 function FxLoading(text) {
     var text = text || "加载中..."
     var html = "<div style='width:100%;height:100%;'></div>";
    
     return {
         add: function () {

         },
         remove: function () {

         }


     }

 }

 /**
 * 获取当前的日期函数
 * 传入一个时间戳,如果不传则为当前时间
 * 注意：如果是uinx时间戳记得乘于1000, 比如php函数time()获得的时间戳就要乘于1000
 * @type String timestamp 要转换的时间戳格式 1469504554276
 * @returns {String} 日期格式: 2016-07-26 10:55:38
 */
 function ge_time_format(timestamp, type) {

     var type = (type == undefined) ? 1 : type, t;
     if(timestamp){
         var date = new Date(timestamp);
     }else{
         var date = new Date();
     }
     Y = date.getFullYear(),
     m = date.getMonth()+1,
     d = date.getDate(),
     H = date.getHours(),
     i = date.getMinutes(),
     s = date.getSeconds();
     if(m<10){
         m = '0'+m;
     }
     if(d<10){
         d = '0'+d;
     }
     if(H<10){
         H = '0'+H;
     }
     if(i<10){
         i = '0'+i;
     }
     if(s<10){
         s = '0'+s;
     }
     
     switch (parseInt(type))
     {
         case 1:
             t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
             break;
         case 2:
             t = Y + '-' + m + '-' + d;
             break;
         case 3:
             t = H + ':' + i + ':' + s;
             break;
         default: break;
     }

     return t;
 }
     /**
      * 日期函数转为时间戳格式
      * 传入一个日期时间格式,如果不传入就是获取现在的时间了
      * @type String strtime 要转换的日期时间格式 2016-07-26 10:55:38
      * @return {String} 时间戳格式: 1469504554276
      */
     function get_unix_time_stamp(strtime){
         if(strtime){
             var date = new Date(strtime);
         }else{
             var date = new Date();
         }
         time1 = date.getTime();   //会精确到毫秒---长度为13位
         //time2 = date.valueOf(); //会精确到毫秒---长度为13位
         //time3 = Date.parse(date); //只能精确到秒，毫秒将用0来代替---长度为10位
         return time1;
     }


     if (!Array.indexOf) {
         Array.prototype.indexOf = function (obj) {
             for (var i = 0; i < this.length; i++) {
                 if (this[i] == obj) {
                     return i;
                 }
             }
             return -1;
         }
     }

//四舍五入为指定小数位数的数字
     function toFixeds(val, N) {
         if (!isNaN(val)) {
             var val = val.toString();
             //有小数点
             var isSpot = function () {
                var n = parseFloat(N), v = val.toString(), last = v.slice(v.indexOf('.') + 1 + n, v.indexOf('.') + 2 + n);
                if (last == 5) {

                    v = v.substr(0, v.indexOf('.') + 1 + n) + 6
                }
                else {
                    v = v.substr(0, v.indexOf('.') + 2 + n)

                }
                return parseFloat(v).toFixed(n);

               // return parseFloat(v).toFixed(n);
             }

             // 补足小数点后天的位数
            var InsufficientFigures = function (v) {
                var i = N - v.slice(v.indexOf('.') + 1).length;
                while (i > 0) {
                    v += '0';
                    i--;
                }
                return v;
            }

           
            if (val.indexOf('.') >= 0) {
        
                if (val.slice(val.indexOf('.') + 1).length > N) {
                    return isSpot();
                }
                else {
                    return InsufficientFigures(val);
                }
            }
            else {
                return InsufficientFigures(val+'.0');
            }
         }
         else {
             //console.log(val + "：不是数字");
         }
     }

    // localstange  添加缓存时间
     //封装过期控制代码
     function localStorageSet(key, value) {
         var curTime = new Date().getTime();
         localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
     }
     //key需要获取的key值   exp是过期的时间
     function localStorageGet(key, exp) {
         var exp = exp || 1000 * 60 * 60; //一个小时
         var data = localStorage.getItem(key);
         if (!data) return null;

         var dataObj = JSON.parse(data);
         if (new Date().getTime() - dataObj.time > exp) {
             console.log('信息已过期');
             return null;
         } else {
             //console.log("data="+dataObj.data);
             //console.log(JSON.parse(dataObj.data));
             var dataObjDatatoJson = JSON.parse(dataObj.data)
             return dataObj.data;
         }
     }



     //模拟键盘事件和鼠标事件
     function fireKeyEvent(el, evtType, keyCode) {
         var doc = el.ownerDocument,
             win = doc.defaultView || doc.parentWindow,
             evtObj;
         fireKeyEventBol = true;
         if (doc.createEvent) {
             if (win.KeyEvent) {
                 evtObj = doc.createEvent('KeyEvents');
                 evtObj.initKeyEvent(evtType, true, true, win, false, false, false, false, keyCode, 0);
             }
             else {
                 evtObj = doc.createEvent('UIEvents');
                 Object.defineProperty(evtObj, 'keyCode', {
                     get: function () { return this.keyCodeVal; }
                 });
                 Object.defineProperty(evtObj, 'which', {
                     get: function () { return this.keyCodeVal; }
                 });
                 evtObj.initUIEvent(evtType, true, true, win, 1);
                 evtObj.keyCodeVal = keyCode;
                 if (evtObj.keyCode !== keyCode) {
                     console.log("keyCode " + evtObj.keyCode + " 和 (" + evtObj.which + ") 不匹配");
                 }
             }
             el.dispatchEvent(evtObj);
         }
         else if (doc.createEventObject) {
             evtObj = doc.createEventObject();
             evtObj.keyCode = keyCode;
             el.fireEvent('on' + evtType, evtObj);
         }

}

//特殊字符转义
function escapeFilter(str) {
    if (str == null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}


/**
 * 时间倒计时插件
 * @param {Object} data 参数对象
 * data:{startDateStr:开始时间,endDateStr:结束时间,callback:function(time){},overCallback:function(){}}
    * startDateStr 开始时间  默认当前
    * endDateStr  结束时间 默认当前时间
    * callback 每次循环的回调 time 剩余时间对象  days:天  hours时  minutes分  seconds秒
    * overCallback 时间到了执行事件
 */
function TimeDown(data) {
    var timer;
    var d = {
        startDateStr: null,
        endDateStr: null,
        callback: function () { },
        overCallback: function () { }
    }

    extend(d, data);
    d.startDateStr = d.startDateStr ? new Date(d.startDateStr.replace(/\-/g, "/")) : new Date();
    d.endDateStr = d.endDateStr ? new Date(d.endDateStr.replace(/\-/g, "/")) : new Date();
    //结束时间
    var endDate = d.endDateStr;
    //当前时间
    var nowDate = d.startDateStr
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    function getTime(d, totalSeconds) {
        //天数
        var days = Math.floor(totalSeconds / (60 * 60 * 24));
        //取模（余数）
        var modulo = totalSeconds % (60 * 60 * 24);
        //小时数
        var hours = Math.floor(modulo / (60 * 60));
        modulo = modulo % (60 * 60);
        //分钟
        var minutes = Math.floor(modulo / 60);
        //秒
        var seconds = modulo % 60;

        //输出到页面
        d.callback(new getDateTime(tow(days), tow(hours), tow(minutes), tow(seconds)));

        if (tow(days) <= 0 && tow(hours) <= 0 && tow(minutes) <= 0 && tow(seconds) <= 0) {
            d.overCallback();
            clearInterval(timer);
            return;
        }
        totalSeconds--;
        //延迟一秒执行自己
        timer = setTimeout(function () {
            getTime(d, totalSeconds);
        }, 1000)
    }
    getTime(d, totalSeconds);

    function overMehtod() {
        clearInterval(timer);
        timer = null;
    }

    function tow(n) {
        return n >= 0 && n < 10 ? '0' + n : '' + n;
    }

    function getDateTime(days, hours, minutes, seconds) {
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }


    function extend(o, n) {
        for (var p in n) {
            o[p] = n[p];

        }
    };
    return{
        overMehtod: overMehtod
    }
}