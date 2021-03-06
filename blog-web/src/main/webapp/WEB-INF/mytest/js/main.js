/**
 * 
 */
"use strict";
var saveAs = saveAs || function (a) {
    "use strict";
    if (typeof a === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return
    }
    var e = a.document,
        t = function () {
            return a.URL || a.webkitURL || a
        },
        i = e.createElementNS("http://www.w3.org/1999/xhtml", "a"),
        n = "download" in i,
        r = function (a) {
            var e = new MouseEvent("click");
            a.dispatchEvent(e)
        },
        o = /constructor/i.test(a.HTMLElement) || a.safari,
        s = /CriOS\/[\d]+/.test(navigator.userAgent),
        c = function (e) {
            (a.setImmediate || a.setTimeout)(function () {
                throw e
            }, 0)
        },
        h = "application/octet-stream",
        m = 1e3 * 40,
        d = function (a) {
            var e = function () {
                if (typeof a === "string") {
                    t().revokeObjectURL(a)
                } else {
                    a.remove()
                }
            };
            setTimeout(e, m)
        },
        l = function (a, e, t) {
            e = [].concat(e);
            var i = e.length;
            while (i--) {
                var n = a["on" + e[i]];
                if (typeof n === "function") {
                    try {
                        n.call(a, t || a)
                    } catch (a) {
                        c(a)
                    }
                }
            }
        },
        f = function (a) {
            if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)) {
                return new Blob([String.fromCharCode(65279), a], {
                    type: a.type
                })
            }
            return a
        },
        y = function (e, c, m) {
            if (!m) {
                e = f(e)
            }
            var y = this,
                v = e.type,
                u = v === h,
                g, w = function () {
                    l(y, "writestart progress write writeend".split(" "))
                },
                x = function () {
                    if ((s || u && o) && a.FileReader) {
                        var i = new FileReader;
                        i.onloadend = function () {
                            var e = s ? i.result : i.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                            var t = a.open(e, "_blank");
                            if (!t) a.location.href = e;
                            e = undefined;
                            y.readyState = y.DONE;
                            w()
                        };
                        i.readAsDataURL(e);
                        y.readyState = y.INIT;
                        return
                    }
                    if (!g) {
                        g = t().createObjectURL(e)
                    }
                    if (u) {
                        a.location.href = g
                    } else {
                        var n = a.open(g, "_blank");
                        if (!n) {
                            a.location.href = g
                        }
                    }
                    y.readyState = y.DONE;
                    w();
                    d(g)
                };
            y.readyState = y.INIT;
            if (n) {
                g = t().createObjectURL(e);
                setTimeout(function () {
                    i.href = g;
                    i.download = c;
                    r(i);
                    w();
                    d(g);
                    y.readyState = y.DONE
                });
                return
            }
            x()
        },
        v = y.prototype,
        u = function (a, e, t) {
            return new y(a, e || a.name || "download", t)
        };
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function (a, e, t) {
            e = e || a.name || "download";
            if (!t) {
                a = f(a)
            }
            return navigator.msSaveOrOpenBlob(a, e)
        }
    }
    v.abort = function () {};
    v.readyState = v.INIT = 0;
    v.WRITING = 1;
    v.DONE = 2;
    v.error = v.onwritestart = v.onprogress = v.onwrite = v.onabort = v.onerror = v.onwriteend = null;
    return u
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content);
if (typeof module !== "undefined" && module.exports) {
    module.exports.saveAs = saveAs
} else if (typeof define !== "undefined" && define !== null && define.amd !== null) {
    define("FileSaver.js", function () {
        return saveAs
    })
}
String.prototype.trim = function () {
    var a = this,
        e = " \n\r\t\f\v            ​\u2028\u2029　";
    for (var t = 0, i = a.length; t < i; t++) {
        if (e.indexOf(a.charAt(t)) === -1) {
            a = a.substring(t);
            break
        }
    }
    for (t = a.length - 1; t >= 0; t--) {
        if (e.indexOf(a.charAt(t)) === -1) {
            a = a.substring(0, t + 1);
            break
        }
    }
    return e.indexOf(a.charAt(0)) === -1 ? a : ""
};

function IsPC() {
    var a = navigator.userAgent;
    var e = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var t = true;
    for (var i = 0; i < e.length; i++) {
        if (a.indexOf(e[i]) > 0) {
            t = false;
            break
        }
    }
    return t
}

function getBrowser(a) {
    var e = navigator.userAgent.toLowerCase(),
        t, i, n, r, o;
    if ("ActiveXObject" in self) {
        r = (n = e.match(/msie ([\d.]+)/)) ? n[1] : (n = e.match(/rv:([\d.]+)/)) ? n[1] : 0;
        t = {
            "trident/7.0": 11,
            "trident/6.0": 10,
            "trident/5.0": 9,
            "trident/4.0": 8
        };
        i = (n = e.match(/(trident|edge\/[\d.]+)/)) ? n[1] : undefined;
        o = (t[i] || r) > 0 ? "ie" : undefined
    } else {
        o = (n = e.match(/edge\/([\d.]+)/)) ? "ie" : (n = e.match(/firefox\/([\d.]+)/)) ? "firefox" : (n = e.match(/chrome\/([\d.]+)/)) ? "chrome" : (n = e.match(/opera.([\d.]+)/)) ? "opera" : (n = e.match(/version\/([\d.]+).*safari/)) ? "safari" : undefined
    } if (a != undefined && n[1]) {
        return o + "/" + n[1]
    } else {
        return o
    }
}
$.fn.extend({
    wait: function (a, e) {
        return this.queue(e || "fx", function () {
            var e = $(this);
            setTimeout(function () {
                e.dequeue()
            }, a || 1e3)
        })
    }
});
var myParallaxBarrierEffect = false;
var container;
var camera, scene, renderer, group, particle;
var mouseX = 0,
    mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var wordsave = new Array;
var chenmotimermax = 100;
var chenmotimerlimit = 3;
var chenmotimer = chenmotimermax;
var searchkeyword = [{
    k: "百度搜索一下|百度一下|百度搜索|百度|搜索|baidu",
    v: "https://www.baidu.com/s?wd=miaoxiaoer"
}, {
    k: "搜狗搜索一下|搜狗一下|搜狗搜索|搜狗|sogou|搜搜|sousou|soso",
    v: "https://www.sogou.com/web?query=miaoxiaoer"
}, {
    k: "淘宝搜索一下|淘宝一下|淘宝搜索|淘宝|taobao",
    v: "https://s.taobao.com/search?q=miaoxiaoer"
}, {
    k: "京东搜索一下|京东一下|京东搜索|京东|jd",
    v: "http://search.jd.com/Search?keyword=miaoxiaoer"
}, {
    k: "360搜一下|360搜索|360搜|360so",
    v: "https://www.so.com/s?ie=utf-8&q=miaoxiaoer"
}, {
    k: "必应搜索一下|必应一下|必应搜索|必应|bing",
    v: "http://www.bing.com/search?q=miaoxiaoer"
}, {
    k: "谷歌搜索一下|谷歌一下|谷歌搜索|谷歌|google",
    v: "https://www.google.com/search?q=miaoxiaoer"
}, {
    k: "知乎搜索一下|知乎一下|知乎搜索|知乎|zhihu",
    v: "https://www.zhihu.com/search?type=content&q=miaoxiaoer"
}, {
    k: "谷歌翻译|翻译",
    v: "http://translate.google.cn/#zh-CN/en/miaoxiaoer"
}, {
    k: "有道翻译",
    v: "http://www.youdao.com/w/miaoxiaoer"
}];
var websitekeyword = [{
    k: "登陆|登录|登陆喵小二|登录喵小二|登录miaoxiaoer.com|loginin|login|denglu",
    v: "../login.html"
}, {
    k: "抛硬币|硬币|coin|yingbi",
    v: "../coin.html"
}, {
    k: "抛硬币2|硬币2|coin2|yingbi2",
    v: "../t/coin2/"
}, {
    k: "弹琴|模拟琴|打开模拟琴|钢琴|打开钢琴|打开琴|弹钢琴|paino|gangqins",
    v: "../t/paino/"
}, {
    k: "调色板|miaoxiaoerpalette|tiaoseban",
    v: "../t/miaoxiaoerpalette/"
}, {
    k: "颜色日历|colorcalendar|yanserili",
    v: "../t/colorcalendar/"
}, {
    k: "喵格|miaog|miaoge",
    v: "../t/miaog/"
}, {
    k: "用户档案|用户资料|用户信息|个人中心|fans|gerenzhongxin",
    v: "../fans.html"
}, {
    k: "打开百度知道|百度知道|zhidao.baidu.com|baiduzhidao",
    v: "https://zhidao.baidu.com"
}, {
    k: "打开百度贴吧|百度贴吧|tieba.baidu.com|baidutieba",
    v: "https://tieba.baidu.com"
}, {
    k: "打开百度|百度|www.baidu.com|baidu.com|baidu",
    v: "https://www.baidu.com"
}, {
    k: "打开搜狗|搜狗|www.sogou.com|sogou.com|sogou",
    v: "https://www.sogou.com"
}, {
    k: "打开淘宝|淘宝|www.taobao.com|taobao.com|taobao",
    v: "https://www.taobao.com"
}, {
    k: "打开京东|京东|www.jd.com|jd.com|jd|jingdong",
    v: "http://www.jd.com"
}, {
    k: "打开知乎|知乎|www.zhihu.com|zhihu.com|zhihu",
    v: "http://www.zhihu.com"
}, {
    k: "打开腾讯|腾讯|www.qq.com|qq.com|tengxun",
    v: "https://www.qq.com"
}, {
    k: "打开豆瓣|豆瓣|www.douban.com|douban.com|douban",
    v: "https://www.douban.com"
}, {
    k: "打开豆瓣电影|豆瓣电影|doubandianying|movie.douban.com",
    v: "https://movie.douban.com"
}, {
    k: "打开豆瓣读书|豆瓣读书|doubandushu|book.douban.com",
    v: "https://book.douban.com"
}, {
    k: "打开豆瓣音乐|豆瓣音乐|doubanyinyue|music.douban.com",
    v: "https://music.douban.com"
}, {
    k: "打开百度地图|百度地图|地图|map|ditu|baiduditu|map.baidu.com",
    v: "https://map.baidu.com"
}, {
    k: "打开有妖气|有妖气|www.u17.com|u17.com|u17|youyaoqi|comic.u17.com",
    v: "http://comic.u17.com"
}, {
    k: "打开站长工具|站长工具|chinaz|zhanzhanggongju|tool.chinaz.com",
    v: "http://tool.chinaz.com"
}, {
    k: "打开阿里云|阿里云|aliyun|www.aliyun.com|aliyun.com",
    v: "https://www.aliyun.com"
}, {
    k: "打开支付宝|支付宝|alipay|zhifubao|www.alipay.com|alipay.com",
    v: "https://www.alipay.com"
}, {
    k: "打开智联招聘|智联招聘|www.zhaopin.com|zhaopin.comzhaopin|zhilian|zhilianzhaopin",
    v: "http://www.zhaopin.com"
}, {
    k: "打开站酷|站酷|zcool|zhanku|www.zcool.com.cn|zcool.com.cn",
    v: "http://www.zcool.com.cn"
}, {
    k: "打开去哪网|去哪网|去哪|quna|qunar|qunar.com|www.qunar.com",
    v: "https://www.qunar.com/"
}, {
    k: "打开美食杰|美食杰|meishij|meishijie|www.meishij.net|meishij.net",
    v: "http://www.meishij.net"
}, {
    k: "打开网易邮箱|网易邮箱|wangyiyouxiang|163youxiang|mail.163.com",
    v: "http://mail.163.com"
}, {
    k: "打开网易|网易|www.163.com|163.com|163|wangyi",
    v: "http://www.163.com"
}, {
    k: "打开优酷|优酷|www.youku.com|youku.com|youku",
    v: "http://www.youku.com"
}, {
    k: "打开qq邮箱|qq邮箱|腾讯邮箱|tengxunyouxiang|qqyouxiang|mail.qq.com",
    v: "http://mail.qq.com"
}, {
    k: "打开cctv|打开央视网|打开央视|打开cntv|央视网|央视|www.cctv.com|cctv.com|cctv|cntv|yangshi",
    v: "http://www.cctv.com"
}, {
    k: "打开爱奇艺|爱奇艺|iqiyi|aiqiyi",
    v: "http://www.iqiyi.com"
}, {
    k: "打开听中国|听中国|tingchina|tingzhognguo|www.tingchina.com|tingchina.com",
    v: "http://www.tingchina.com"
}, {
    k: "打开新浪微博|新浪微博|微博|weibo|weibo|www.weibo.com|weibo.com",
    v: "http://www.weibo.com"
}, {
    k: "打开新浪|新浪|sina|xinlang|www.sina.com|sina.com",
    v: "http://www.sina.com"
}, {
    k: "打开搜狐|搜狐|sohu|souhu|www.sohu.com|sohu.com",
    v: "http://www.sohu.com"
}, {
    k: "打开必应|必应|bing|biying|www.bing.com|bing.com",
    v: "http://www.bing.com"
}, {
    k: "打开谷歌|谷歌|google|guge|www.google.com|google.com",
    v: "https://www.google.com"
}, {
    k: "打开天猫|天猫|tmall|tianmao|www.tmall.com|tmall.com",
    v: "https://www.tmall.com"
}, {
    k: "打开live.com|www.live.com|live.com",
    v: "https://live.com"
}, {
    k: "打开聚美优品|聚美优品|jumei|jumei|www.jumei.com|jumei.com",
    v: "http://www.jumei.com"
}, {
    k: "打开阿里邮箱|阿里邮箱|阿里云邮箱|aliyunmail|aliyunyou|aliyunyouxiang|mail.aliyun.com",
    v: "http://mail.aliyun.com"
}, {
    k: "打开音乐|打开网易音乐|网易云音乐|我要播放音乐|播放音乐|音乐|我要听歌|播放|背景音乐|听歌|music|playmusic|music.163.com|wangyiyunyinyue",
    v: "http://music.163.com/m/playlist?id=455397770"
}, {
    k: "打开翻译|打开谷歌翻译|translate.google.cn|gugefanyi",
    v: "http://translate.google.cn/"
}, {
    k: "打开百度翻译|百度翻译|fanyi.baidu.com|baidufanyi",
    v: "http://fanyi.baidu.com/"
}, {
    k: "打开哔哩哔哩|哔哩哔哩|bilibili.com|打开bilibili|bilibili|bilibil|去b站|b站|进入bilibili",
    v: "http://www.bilibili.com/"
}, {
    k: "打开有道|有道|youdao|www.youdao.com|youdao.com",
    v: "http://www.youdao.com/"
}, {
    k: "打开关于我|关于我|关于站长|关于陈辰|陈辰|本站作者|网页作者|关于作者|关于站长|站长资料|站长档案|站长|关于chenchen|aboutchenchen|chenchen|作者|zhanzhang|zuozhe|contact",
    v: "../aboutme.html"
}, {
    k: "打开关于喵小二|关于喵小二|resume|喵小二|miaoxiaoer|关于miaoxiaoer|guanyumiaoxiaoer",
    v: "../aboutmiaoxiaoer.html"
}, {
    k: "打开喵小二贴吧|喵小二贴吧|贴吧|tieba",
    v: "http://tieba.baidu.com/f?kw=喵小二&ie=utf-8"
}, {
    k: "打开喵小二的淘宝|喵小二的淘宝小铺|喵小二的淘宝|喵小二淘宝小铺|淘宝小铺|taobaoxiaopu",
    v: "https://shop109861986.taobao.com"
}, {
    k: "喵小二的百度HI|喵小二百度HI|百度HI|baiduhi",
    v: "../baiduhi.html"
}, {
    k: "喵小二的易信|喵小二易信|易信|加易信|易信二维码|易信扫一扫|yixin",
    v: "../yixin.html"
}, {
    k: "打开喵小二的人人网|喵小二的人人网|喵小二人人网|人人网|renrenwang",
    v: "http://www.renren.com/271371249"
}, {
    k: "喵小二的qq|喵小二qq|qq",
    v: "http://wpa.qq.com/msgrd?v=3&uin=693838953&site=qq&menu=yes"
}, {
    k: "喵小二的qq群|加入喵小二粉丝群|加入喵小二qq群|加入喵小二粉丝群一号房|喵小二粉丝群一号房|喵小二qq群|加入qq群|qq群|qqqun",
    v: "http://shang.qq.com/wpa/qunwpa?idkey=825ce4abdb37ed035dd42b35005f835d786e59049b665baac979228a212cae96"
}, {
    k: "喵小二的微信|喵小二微信|微信|加微信|微信二维码|微信扫一扫|weixin",
    v: "../weixin.html"
}, {
    k: "喵小二的旺信|喵小二旺信|旺信|加旺信|旺信二维码|旺信扫一扫|wangxin",
    v: "../wangxin.html"
}, {
    k: "喵小二的微博|喵小二微博|miaoxiaoerdeweibo",
    v: "http://weibo.com/234969702"
}, {
    k: "喵小二的facebook|喵小二facebook|facebook",
    v: "http://facebook.com/miaoxiaoer"
}, {
    k: "看漫画|喵小二的漫画|喵小二漫画|漫画|miaoxiaoermanhua|manhua",
    v: "http://i.u17.com/603363/comic"
}, {
    k: "迷宫|生成迷宫|画迷宫|画个迷宫|打开迷宫生成器|maze|migong",
    v: "../t/maze/"
}, {
    k: "打开名字|打开名字生成器|名字生成器|getname",
    v: "../t/getname/"
}, {
    k: "打开密码|打开密码生成器|密码生成器|getpassword",
    v: "../t/getpassword/"
}, {
    k: "诗生成器|打开诗生成器|getpoem",
    v: "../t/getpoem/"
}, {
    k: "健身助手|锻炼助手|我要锻炼|健身|锻炼身体|锻炼|我要锻炼|我要健身|我要锻炼身体|execise|exerciseassist|duanlian|jianshen",
    v: "../t/exerciseassist/"
}, {
    k: "生成漫画框|漫画框|comicbox|manhuakuang",
    v: "../t/comicbox2/"
}, {
    k: "飞翔喵|飞向喵|flappymiao|feixiangmiao",
    v: "../t/flappymiao/"
}, {
    k: "进入聊天室|打开聊天室|聊天室|chatroom|liaotianshi|liaotian",
    v: "../chatroom.html"
}, {
    k: "打开新闻|打开博客|博文|进入博客|浏览新闻|进入新闻|新闻|最近消息|最近怎么样|博客|浏览博客|个人博客|news|xinwen|boke|gerenboke|blog",
    v: "../news.html"
}, {
    k: "实验室|shiyan|shiyanshi|hudong",
    v: "../hudong.html"
}, {
    k: "下载|资源下载|资源库|xiazai|ziyuanku|ziyuank|download",
    v: "../download.html"
}, {
    k: "api|网站接口|应用接口|绘画爱好者接口|应用程序接口|接口|第三方接口|api列表|绘画爱好者api|绘画爱好者接口|本站api|网站api",
    v: "../api/"
}, {
    k: "关于|guanyu|about",
    v: "../about.html"
}, {
    k: "画画|绘画|画一张画|来一张画|画一张|给我画一张|绘画作品|我要一张画|作画|huahua|painting|huihua",
    v: "../t/painting/"
}, {
    k: "来个福利|来个mm|美女图片|给我福利|给我mm|我要福利|我要mm|福利|mm福利|mm",
    v: "../mm.html"
}, {
    k: "来个鲜肉|来个gg|给我鲜肉|给我gg|我要鲜肉|我要gg|鲜肉|gg鲜肉|gg",
    v: "../gg.html"
}, {
    k: "画笔|我要画画|我要画一张画|huabi|painter",
    v: "../t/painter/"
}, {
    k: "打开铁路客服中心|中国铁路客户服务中心|铁路客户服务中心|铁路客服中心|买火车票|买车票|火车票|列车查询|火车票查询|火车查询|12306",
    v: "http://www.12306.cn"
}, {
    k: "打开快递一百|打开快递查询|快递一百|快递100|查询快递|快递查询|查快递|快递|kuaidi100",
    v: "http://www.kuaidi100.com"
}, {
    k: "天气预报|天气情况|天气如何|天气查询|查询天气|查天气|中国天气|天气怎么样|天气怎样|今天天气|今日天气|天气中国|最近天气|天气|weather",
    v: "http://www.weather.com.cn"
}, {
    k: "email|邮件|发邮件|写信|发送邮件",
    v: "mailto:chenx4@163.com"
}, {
    k: "给个标志|给个标志设计|给我个标志|给我标志设计|我要设计标志|我要标志|生成标志|设计标志|标志设计|标志|标志形象|logodesign|getlogo|designlogo|logo",
    v: "../t/getlogo"
}, {
    k: "模拟琴|模拟键盘|模拟钢琴|钢琴|电子琴|琴|paino|dianziqin|qin|gangqin|moniqin|monigangqin|monijianpan|jianpan",
    v: "../t/paino"
}, {
    k: "给个卡通形象设计|给我个卡通形象|给我卡通形象设计|我要设计卡通形象|我要卡通形象|生成卡通形象|设计卡通形象|卡通形象设计|给个卡通|给个卡通形象|给个卡通设计|给我个卡通|给我卡通设计|我要设计卡通|我要卡通|生成卡通|设计卡通|卡通设计|卡通|卡通形象|cartoondesign|cartoon",
    v: "../t/getcartoon"
}, {
    k: "更换背景图|清除|重画|背景不好看|背景图不好看|背景真丑|页面真丑|页面好丑|页面不好看|更换页面|刷新页面|刷新|真丑|不好看|好丑啊|好丑|丑丑|更丑|最丑|丑丑丑丑|丑丑丑丑丑|丑丑丑丑丑丑|丑丑丑丑丑丑丑|丑丑丑|丑|换个背景|换个背景吧|我想换个背景|我要换个背景|我要更换背景|更换背景|换个背景|换一个背景|换背景|背景|刷新背景|刷背景|change background",
    v: "$.CreatBackground()"
}, {
    k: "怎么用|不会用|我不会用|不会用这个网站|我不会用这个网站|如何使用|这个怎么用|这个怎么使用|使用说明|如何用|关键词|help|helper|how",
    v: "../how.html"
}, {
    k: "源代码|查看源代码|查看源码|查看网页源码|查看网页源代码|查看页面源代码|查看页面源码|我要源代码|我要源码|本站源码|网站源代码|sourcecode|source|code|yuandaima|网页源码|源码|网站源码",
    v: '$.ViewSource("http://miaoxiaoer.com/index.html")'
}, {
    k: "打开谈话记录|谈话记录",
    v: "$.ShowMessageRecorder()"
}, {
    k: "黄色网站|黄色背景|黄色",
    v: "$.YellowBackground()"
}, {
    k: "绿色网站|绿色背景|绿色",
    v: "$.GreenBackground()"
}, {
    k: "红色网站|红色背景|红色",
    v: "$.RedBackground()"
}, {
    k: "蓝色网站|蓝色背景|蓝色",
    v: "$.BlueBackground()"
}, {
    k: "青色网站|青色背景|青色",
    v: "$.CyanBackground()"
}];
var iwuliaoing = ["输入关键词“迷宫”，可以玩迷宫哦。", "输入关键词“硬币”，可以玩硬币哦。", "输入关键词“健身”，可以开始健身哦。", "输入关键词“笑话”，我可以给你讲个笑话。", "输入关键词“鬼故事”，我可以给你讲个鬼故事。", "输入关键词“写诗”，我可以给你写一首自由诗哦。", "输入关键词“春联”，我可以给一个春联哦。", "输入关键词“谚语”，我可以给一个谚语哦。", "输入关键词“绕口令”，我可以给说一个哦。", "输入关键词“命名”，我可以给你起个名字。", "输入关键词“密码”，我可以给你编个密码。", "输入关键词“吃什么”，我可以给你一个建议。", "输入关键词“电影”，我可以给你推荐一部哦。", "输入关键词“推荐音乐”，我可以给你推荐一首呢·", "输入关键词“推荐游戏”，我可以给你推荐一个呢·", "输入关键词“推荐漫画”，我可以给你推荐一个呢·", "输入关键词“推荐书”，我可以给你推荐一个呢·", "输入关键词“画画”，我可以给你画一个图片。", "这么久都不理人家，你自己玩吧。", "耶，有块肥皂要不要捡呢", "我还是做个安静的美男子吧...", "好吧，我想静静，一万年都不要理我。", "哼，挂机鬼，我和你聊天，你都不理我。再和你说一句话，我就是小狗。", "亲，你是本站第一千名访客，中了500万像素大彩电一台，你不想说点什么吗？", "由于长久以来都是我再说，你连个叼毛都不回复，让我不得不怀疑我是在和一个爬虫程序在聊天。", "由于长久以来都是我再说，让我不得不怀疑我是在和一个爬虫程序在聊天。", "刚刚我想了很久，你一直都在沉默，所以我觉得自己很亏，不要和你玩了，再见。", "忙的话就关掉网页，你这挂机什么都不做，什么意思啊。", "回答我，这么久不理本喵，你是不是在偷看A片啊？", "关于寂寞，就是你在我面前，我们什么都没有说。", "说点什么呗，在不说话，我也挂机了。", "比赛谁先开口说话吗，好的，本喵绝不再多说一个字。", "我靠，和本喵比挂机吗？有本事你挂到地老天荒白发千古。", "有本事你别说话，谁先说话谁就是小狗。", "虽然沉默是金，但是如果咱们两个都闭嘴，别人会以为我们之间有什么呢。", "就这样沉默你不腻吗？", "浪里格浪里格浪里格浪，你是哑巴哑巴哑巴吗？", "嘿，出点声，让我知道你没睡。", "给个反应好不好，我这样一个喵不停的BB很累的。", "就算你不喜欢我，也不要不理我吗，来骂我两句。", "感觉自己萌萌哒，为什么不理我", "快看，肉包子在天上飞呢", "咦，这是谁掉了一百万呢", "咦，要不要跟我聊聊天呢，我上不知天文下不知地理，可好糊弄了呢", "给你脸不要脸是不，非要本喵骂你才会回答我吗？大坏蛋。", "为了宇宙和平，为了全人类的幸福，咱们说点什么吧", "看在上帝的份上，你不打算说点什么吗？", "人生八苦：生、老、病、死、求不得、怨憎恨、爱别离、很无聊。", "夜深了,我知道你忙了一天累了，可能睡着了，我不知道为什么想和你说话，可能心情不美丽吧，我很想告诉你：我是故意把你吵醒的，哈哈哈。", "一直有三个字想对你说，特别是在这寂静的时刻，更是无法将我火热的心情对你倾诉，直到它在我心底爆发，让我不得不对你说...快说话！", "我两本无缘分，全靠沉默是金。", "我认为你好厉害，这么久都能保持沉默的人不多哦。", "我刚刚捡到一段代码不知道是不是你掉的！"];
var irrrrrrr = Math.random();
iwuliaoing.sort(function (a, e) {
    return irrrrrrr - Math.random()
});
var myShowMenu = true;
var messageformSubmitResponse;
var messageformWeatherResponse;
var MyResizing = false;
var MyResizingId = 0;
var mycanvas = document.getElementById("mycanvas");
var MyPoint = [];
var cxt;
var MySatisfactionSubmited = "已经提交了";
var MyPen = Math.random();
var icwcc = Math.random() * 7;
var icwcc2 = Math.random() * 7;
var icwcc3 = Math.random() * 7;
var icwcc4 = Math.random() * 9 + 9;
var ijuli = 100;
var olddis = 0;
var upof = {};
var radius = 0;
var has = [];
var lineMax = Math.random() * 80 + 20;
var lineMin = Math.random() * 10 + .5;
var linePressure = Math.random() * 5;
var smoothness = Math.random() * 160 + 40;
var mylog = " ";
var oldpoint = {};
var penweight = Math.random() * 7;
var mycanvasdata;
var lineWidthTemp = 1;
var tempcolor;
var lightcolor, darkcolor, dushcolor;
var ov = 0;
var upov = 0;
if (mycanvas.getContext) {
    cxt = mycanvas.getContext("2d")
}
var pp = false;
var raincolora = Math.floor(Math.random() * 100) / 100;
$.extend({
    GetRandomInt: function (a) {
        return parseInt(Math.floor(Math.random() * a))
    }, ChenmoInit: function () {
        chenmotimer = chenmotimermax;
        setTimeout("$.ChenmoInterval()", 1e3)
    }, ChenmoInterval: function () {
        if ($("#myinput").val() == "") {
            chenmotimer = chenmotimer - 1;
            if (chenmotimer <= 0) {
                if (Math.random() > .6) {
                    if (chenmotimerlimit > 0) {
                        chenmotimerlimit = chenmotimerlimit - 1;
                        chenmotimer = chenmotimermax + Math.ceil(Math.random() * 200);
                        $.SendChenmoMessage()
                    } else {
                        var a = iwuliaoing[Math.floor(Math.random() * iwuliaoing.length)];
                        if (chenmotimerlimit != -9) {
                            chenmotimer = chenmotimermax + Math.ceil(Math.random() * 200);
                            $.AddMessageRecorder("喵小二", a);
                            $.showAMessage(a, a);
                            if (Math.random() > .6) {
                                chenmotimerlimit = -9
                            }
                        }
                    }
                } else {
                    chenmotimer = chenmotimermax
                }
            }
        } else {
            chenmotimer = chenmotimermax
        }
        setTimeout("$.ChenmoInterval()", 1e3)
    }, speak: function (a) {
        try {
            var e = new SpeechSynthesisUtterance;
            e.lang = "zh-CN";
            e.pitch = 1.5;
            e.text = a;
            window.speechSynthesis.speak(e)
        } catch (a) {}
    }, hideInputBox: function () {
        $("#myinput").fadeOut();
        $("#mysendbtn").fadeOut()
    }, showInputBox: function () {
        $("#myinput").fadeIn(function () {});
        $("#mysendbtn").fadeIn()
    }, showAMessage: function (a, e) {
        $("#mysee").stop(true, false).animate({
            opacity: 0
        }, {
            duration: 520,
            easing: "easeOutQuad",
            complete: function () {
                if (typeof e == "string") {
                    $.speak(e)
                } else {
                    $.speak(a)
                }
                $("#mysee").html(a);
                $("#mysee").stop(true, false).animate({
                    opacity: 1
                }, {
                    duration: 520,
                    easing: "easeOutQuad",
                    complete: function () {
                        $("#myinput").focus()
                    }
                })
            }
        })
    }, showMessages: function (a, e) {
        $("#mysee").stop(true, false).animate({
            opacity: 0
        }, {
            duration: 520,
            easing: "easeOutQuad",
            complete: function () {
                if (typeof esp == "string") {
                    $.speak(esp)
                } else {
                    $.speak(eMessage)
                }
                $("#mysee").html(eMessage);
                $("#mysee").stop(true, false).animate({
                    opacity: 1
                }, {
                    duration: 520,
                    easing: "easeOutQuad",
                    complete: function () {}
                })
            }
        })
    }, showWelcomeMessage: function () {
        var a = ["你好", "你好", "Hello", "Hi", "欢迎光临", "主人", "老大", "老板", "客官", "么么哒", "亲", "朋友", "亲爱的", "小可爱", "这位小兄弟", "兄台", "大爷", "老爷", "皇上", "大哥", "大哥大", "大兄弟", "嘿", "哎吆喂"];
        var e = a[$.GetRandomInt(a.length)];
        $.AddMessageRecorder("喵小二", e);
        $.speak(e);
        $("#mysee").html(e);
        $("#mysee").wait(600).animate({
            opacity: 0
        }, {
            duration: 520,
            easing: "easeOutQuad",
            complete: function () {
                var a = ["我能为你做点什么？", "我能为你做点什么？", "我能为你做点什么？", "需要帮什么忙吗？", "有什么需要帮忙的吗？", "需要什么帮助吗？", "有何吩咐?", "尽管吩咐", "请您吩咐", "尽请吩咐", "尽请吩咐"];
                var e = a[$.GetRandomInt(a.length)];
                $.AddMessageRecorder("喵小二", e);
                $("#mysee").html(e);
                $.speak(e);
                $("#myloadingbox").hide();
                $("#mysee").animate({
                    opacity: 1
                }, {
                    duration: 520,
                    easing: "easeOutQuad",
                    complete: function () {}
                })
            }
        });
        $.showInputBox()
    }, printerstep: function (a) {
        if (pp) {
            if (MyPen > .9) {
                var e = 0;
                var t = 0;
                olddis = $.distance(upof, upof);
                if (has.length < 4) {
                    olddis = smoothness / 4
                }
                has.unshift({
                    time: (new Date).getTime(),
                    dis: olddis
                });
                for (var i = 0; i < has.length - 1; i++) {
                    e += has[i].dis;
                    t += has[i].time - has[i + 1].time;
                    if (e > smoothness) break
                }
                var n = Math.min(t / e * linePressure + lineMin, lineMax) / 3;
                radius = n;
                var r = radius;
                if (has.length > 4) {
                    var o = Math.round(has[0].dis / 2) + 1;
                    for (var s = 0; s < o; s++) {
                        var c = upof.x;
                        var h = upof.y;
                        var m = r + (n - r) / o * s;
                        if (has.length <= 5) {
                            m = lineMin
                        }
                        $.fillRectM(c, h, m)
                    }
                }
            } else if (MyPen > .8) {} else if (MyPen > .7) {} else if (MyPen > .6) {
                var d = 3;
                d = $.rnd(1, icwcc4);
                for (var s = 0; s < d; s++) {
                    icwcc = Math.random() * icwcc2;
                    cxt.beginPath();
                    cxt.moveTo(oldpoint.x + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5), oldpoint.y + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5));
                    cxt.arc(oldpoint.x + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5), oldpoint.y + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5), icwcc, 0, Math.PI * 2, true);
                    cxt.closePath();
                    cxt.fill()
                }
            } else if (MyPen > .5) {
                var r = radius;
                var e = 0;
                var t = 0;
                olddis = $.distance(upof, upof);
                if (has.length < 4) {
                    olddis = smoothness / 4
                }
                has.unshift({
                    time: (new Date).getTime(),
                    dis: olddis
                });
                for (var i = 0; i < has.length - 1; i++) {
                    e += has[i].dis;
                    t += has[i].time - has[i + 1].time;
                    if (e > smoothness) break
                }
                var n = Math.min(t / e * linePressure + lineMin, lineMax) / 2;
                radius = n;
                if (has.length > 4) {
                    var o = Math.round(has[0].dis / 2) + 1;
                    for (var s = 0; s < o; s++) {
                        var c = upof.x;
                        var h = upof.y;
                        var m = r + (n - r) / o * s;
                        $.fillRC(c, h, m)
                    }
                }
            } else if (MyPen > .4) {} else if (MyPen > .3) {} else if (MyPen > .2) {} else if (MyPen > .1) {
                var e = 0;
                var t = 0;
                olddis = $.distance(upof, upof);
                if (has.length < 4) {
                    olddis = smoothness / 4
                }
                has.unshift({
                    time: (new Date).getTime(),
                    dis: olddis
                });
                for (var i = 0; i < has.length - 1; i++) {
                    e += has[i].dis;
                    t += has[i].time - has[i + 1].time;
                    if (e > smoothness) break
                }
                var n = Math.min(t / e * linePressure + lineMin, lineMax) / 2;
                radius = n;
                var r = radius;
                if (has.length > 4) {
                    var o = Math.round(has[0].dis / 2) + 1;
                    for (var s = 0; s < o; s++) {
                        var c = upof.x;
                        var h = upof.y;
                        var m = r + (n - r) / o * s;
                        cxt.beginPath();
                        cxt.arc(c, h, m, 0, 2 * Math.PI, true);
                        cxt.fill()
                    }
                }
            } else {}
            requestAnimationFrame($.printerstep)
        }
    }, initPageEvent: function () {
        $("body").dblclick(function () {
            MyPen = Math.random();
            if (!IsPC()) {
                if (MyPen > .9) {} else if (MyPen > .8) {} else if (MyPen > .7) {
                    MyPen = MyPen + .1
                } else if (MyPen > .6) {} else if (MyPen > .5) {
                    MyPen = MyPen + .1
                } else if (MyPen > .4) {} else if (MyPen > .3) {
                    MyPen = MyPen + .1
                } else if (MyPen > .2) {} else if (MyPen > .1) {} else {}
            }
        });
        $("body").on("touchstart", function (a) {
            a = a.originalEvent.targetTouches[0];
            cxt.lineCap = "round";
            cxt.lineJoin = "round";
            cxt.beginPath();
            var e = a.pageX - mycanvas.offsetLeft;
            var t = a.pageY - mycanvas.offsetTop;
            pp = true;
            cxt.moveTo(e, t);
            if (MyPen > .9) {
                penweight = $.rnd(1, 9);
                if (Math.random() > .8) {
                    if (Math.random() > .2) {
                        lineMax = Math.random() * 160 + 40
                    }
                    if (Math.random() > .2) {
                        lineMin = Math.random() * 10 + .5
                    }
                    if (Math.random() > .2) {
                        linePressure = Math.random() * 6
                    }
                    if (Math.random() > .2) {
                        smoothness = Math.random() * 160 + 40
                    }
                }
                if (Math.random() > .5) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
                has = [];
                upof = $.getXY(a)
            } else if (MyPen > .8) {
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            } else if (MyPen > .7) {
                cxt.putImageData(mycanvasdata, 0, 0);
                mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height);
                MyPoint = [];
                upof = $.getXY(a);
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            } else if (MyPen > .6) {
                if (MyPen > .65) {
                    if (Math.random() > .6) {
                        cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                    }
                    icwcc2 = Math.random() * 13
                } else {
                    if (Math.random() > .6) {
                        cxt.fillStyle = cxt.strokeStyle = $.rndcolor22()
                    }
                    icwcc2 = Math.random() * 13
                }
            } else if (MyPen > .5) {
                penweight = $.rnd(1, 9);
                if (Math.random() > .8) {
                    if (Math.random() > .2) {
                        lineMax = Math.random() * 160 + 40
                    }
                    if (Math.random() > .2) {
                        lineMin = Math.random() * 1 + .5
                    }
                    if (Math.random() > .2) {
                        linePressure = Math.random() * 6
                    }
                    if (Math.random() > .2) {
                        smoothness = Math.random() * 160 + 40
                    }
                }
                if (Math.random() > .5) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor3()
                }
                has = [];
                radius = lineMin;
                upof = $.getXY(a)
            } else if (MyPen > .4) {
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
                if (MyPen > .45) {} else {
                    upof = $.getXY(a);
                    cxt.lineWidth = .1;
                    cxt.moveTo(e, t)
                }
            } else if (MyPen > .3) {
                cxt.putImageData(mycanvasdata, 0, 0);
                if (IsPC()) {
                    mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                }
                MyPoint = [];
                upof = $.getXY(a);
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            } else if (MyPen > .2) {
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            } else if (MyPen > .1) {
                if (Math.random() > .8) {
                    if (Math.random() > .2) {
                        lineMax = Math.random() * 160 + 40
                    }
                    if (Math.random() > .2) {
                        lineMin = Math.random() * 10 + .5
                    }
                    if (Math.random() > .2) {
                        linePressure = Math.random() * 6
                    }
                    if (Math.random() > .2) {
                        smoothness = Math.random() * 160 + 40
                    }
                }
                if (Math.random() > .5) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor2()
                }
                has = [];
                upof = $.getXY(a)
            } else {
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            }
            requestAnimationFrame($.printerstep)
        });
        $("body").on("touchmove", function (a) {
            a.preventDefault();
            a = a.originalEvent.targetTouches[0];
            var e = a.pageX;
            var t = a.pageY;
            var i = 3;
            if (pp) {
                if (MyPen > .9) {
                    var n = $.getXY(a);
                    var r = upof;
                    var o = radius;
                    olddis = $.distance(r, n);
                    if (has.length < 4) {
                        olddis = smoothness / 4
                    }
                    has.unshift({
                        time: (new Date).getTime(),
                        dis: olddis
                    });
                    var s = 0;
                    var c = 0;
                    for (var h = 0; h < has.length - 1; h++) {
                        s += has[h].dis;
                        c += has[h].time - has[h + 1].time;
                        if (s > smoothness) break
                    }
                    var m = Math.min(c / s * linePressure + lineMin, lineMax) / 2;
                    radius = m;
                    upof = n;
                    if (has.length > 4) {
                        var d = Math.round(has[0].dis / 2) + 1;
                        for (var l = 0; l < d; l++) {
                            var f = r.x + (n.x - r.x) / d * l;
                            var y = r.y + (n.y - r.y) / d * l;
                            var v = o + (m - o) / d * l;
                            $.fillRectM(f, y, v)
                        }
                    }
                } else if (MyPen > .8) {
                    cxt.lineTo(e, t);
                    cxt.stroke()
                } else if (MyPen > .7) {
                    cxt.lineTo(e, t);
                    cxt.stroke();
                    var u = $.getXY(a);
                    if (MyPoint.length == 0) {
                        MyPoint.push({
                            time: (new Date).getTime(),
                            x: u.x,
                            y: u.y
                        })
                    } else {
                        if (upof != u) {
                            MyPoint.push({
                                time: (new Date).getTime(),
                                x: u.x,
                                y: u.y
                            })
                        }
                    }
                    upof = u
                } else if (MyPen > .6) {
                    i = $.rnd(1, icwcc4);
                    for (var l = 0; l < i; l++) {
                        icwcc = Math.random() * icwcc2;
                        cxt.beginPath();
                        cxt.moveTo(e + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5), t + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5));
                        cxt.arc(e + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5), t + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5), icwcc, 0, Math.PI * 2, true);
                        cxt.closePath();
                        cxt.fill()
                    }
                    oldpoint.x = e;
                    oldpoint.y = t
                } else if (MyPen > .5) {
                    var n = $.getXY(a);
                    var r = upof;
                    var o = radius;
                    olddis = $.distance(r, n);
                    if (has.length < 4) {
                        olddis = smoothness / 4
                    }
                    has.unshift({
                        time: (new Date).getTime(),
                        dis: olddis
                    });
                    var s = 0;
                    var c = 0;
                    for (var h = 0; h < has.length - 1; h++) {
                        s += has[h].dis;
                        c += has[h].time - has[h + 1].time;
                        if (s > smoothness) break
                    }
                    var m = Math.min(c / s * linePressure + lineMin, lineMax) / 2;
                    radius = m;
                    upof = n;
                    if (has.length > 4) {
                        var d = Math.round(has[0].dis / 2) + 1;
                        for (var l = 0; l < d; l++) {
                            var f = r.x + (n.x - r.x) / d * l;
                            var y = r.y + (n.y - r.y) / d * l;
                            var v = o + (m - o) / d * l;
                            $.fillRC(f, y, v)
                        }
                    }
                } else if (MyPen > .4) {
                    if (MyPen > .45) {
                        cxt.lineTo(e, t);
                        if (Math.random() > .9) {
                            i = $.rnd(0, 3);
                            for (var l = 0; l < i; l++) {
                                cxt.arc(e + $.rnd(10, 20) * (Math.random() - .5), t + $.rnd(10, 20) * (Math.random() - .5), icwcc, 0, Math.PI * (2 * Math.random()), true)
                            }
                        }
                        cxt.stroke()
                    } else {
                        var g = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                        var w = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                        if (MyPen > .425) {
                            cxt.moveTo(upof.x + g, upof.y + w)
                        } else if (MyPen > .4125) {
                            cxt.moveTo(upof.x - g, upof.y + g)
                        } else {
                            cxt.moveTo(upof.x + g, upof.y + g)
                        }
                        g = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                        w = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                        if (MyPen > .425) {
                            cxt.lineTo(e + g, t + w)
                        } else if (MyPen > .4125) {
                            cxt.lineTo(e + g, t - g)
                        } else {
                            cxt.lineTo(e + g, t + g)
                        }
                        var x = $.rnd(1, 5);
                        for (var l = 0; l < x; l++) {
                            g = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                            w = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                            if (MyPen > .425) {
                                cxt.moveTo(upof.x + g, upof.y + w)
                            } else if (MyPen > .4125) {
                                cxt.moveTo(upof.x - g, upof.y + g)
                            } else {
                                cxt.moveTo(upof.x + g, upof.y + g)
                            }
                            g = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                            w = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                            if (MyPen > .425) {
                                cxt.lineTo(e + g, t + w)
                            } else if (MyPen > .4125) {
                                cxt.lineTo(e + g, t - g)
                            } else {
                                cxt.lineTo(e + g, t + g)
                            }
                        }
                        if (Math.random() > .9) {
                            i = $.rnd(0, 3);
                            for (var l = 0; l < i; l++) {
                                cxt.arc(e + $.rnd(10, 20) * (Math.random() - .5), t + $.rnd(10, 20) * (Math.random() - .5), icwcc, 0, Math.PI * (2 * Math.random()), true)
                            }
                        }
                        cxt.stroke();
                        upof = $.getXY(a)
                    }
                } else if (MyPen > .3) {
                    cxt.lineTo(e, t);
                    cxt.stroke();
                    var u = $.getXY(a);
                    if (MyPoint.length == 0) {
                        MyPoint.push({
                            time: (new Date).getTime(),
                            x: u.x,
                            y: u.y
                        })
                    } else {
                        if (upof != u) {
                            MyPoint.push({
                                time: (new Date).getTime(),
                                x: u.x,
                                y: u.y
                            })
                        }
                    }
                    upof = u
                } else if (MyPen > .2) {
                    cxt.lineTo(e, t);
                    cxt.stroke()
                } else if (MyPen > .1) {
                    var n = $.getXY(a);
                    var r = upof;
                    var o = radius;
                    olddis = $.distance(r, n);
                    if (has.length < 4) {
                        olddis = smoothness / 4
                    }
                    has.unshift({
                        time: (new Date).getTime(),
                        dis: olddis
                    });
                    var s = 0;
                    var c = 0;
                    for (var h = 0; h < has.length - 1; h++) {
                        s += has[h].dis;
                        c += has[h].time - has[h + 1].time;
                        if (s > smoothness) break
                    }
                    var m = Math.min(c / s * linePressure + lineMin, lineMax) / 2;
                    radius = m;
                    upof = n;
                    if (has.length > 4) {
                        var d = Math.round(has[0].dis / 2) + 1;
                        for (var l = 0; l < d; l++) {
                            var f = r.x + (n.x - r.x) / d * l;
                            var y = r.y + (n.y - r.y) / d * l;
                            var v = o + (m - o) / d * l;
                            cxt.beginPath();
                            cxt.arc(f, y, v, 0, 2 * Math.PI, true);
                            cxt.fill()
                        }
                    }
                } else {
                    cxt.lineTo(e + $.rnd(10, 20) * (Math.random() - .5), t + $.rnd(10, 20) * (Math.random() - .5));
                    if (Math.random() > .9) {
                        i = $.rnd(0, 3);
                        for (var l = 0; l < i; l++) {
                            cxt.arc(e + $.rnd(10, 20) * (Math.random() - .5), t + $.rnd(10, 20) * (Math.random() - .5), icwcc, 0, Math.PI * (2 * Math.random()), true)
                        }
                    }
                    cxt.stroke()
                }
            }
        });
        $("body").on("touchend", function (a) {
            a = a.originalEvent.touches[0];
            if (pp) {
                if (MyPen > .9) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .8) {
                    cxt.fill();
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .7) {
                    var e = $.getXY(a);
                    MyPoint.push({
                        time: (new Date).getTime(),
                        x: e.x,
                        y: e.y
                    });
                    cxt.putImageData(mycanvasdata, 0, 0);
                    $.drawBLine2(MyPoint);
                    mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                } else if (MyPen > .6) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .5) {
                    has = [];
                    upof = $.getXY(a);
                    radius = lineMin;
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .4) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .3) {
                    var e = $.getXY(a);
                    MyPoint.push({
                        time: (new Date).getTime(),
                        x: e.x,
                        y: e.y
                    });
                    cxt.putImageData(mycanvasdata, 0, 0);
                    $.drawBLine(MyPoint);
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .2) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .1) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else {
                    cxt.closePath();
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                }
            }
            pp = false
        });
        $("body").on("touchcancel", function (a) {
            a = a.originalEvent.touches[0];
            if (pp) {
                if (MyPen > .9) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .8) {
                    cxt.fill();
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .7) {
                    var e = $.getXY(a);
                    MyPoint.push({
                        time: (new Date).getTime(),
                        x: e.x,
                        y: e.y
                    });
                    cxt.putImageData(mycanvasdata, 0, 0);
                    $.drawBLine2(MyPoint);
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .6) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .5) {
                    has = [];
                    upof = $.getXY(a);
                    radius = lineMin;
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .4) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .3) {
                    var e = $.getXY(a);
                    MyPoint.push({
                        time: (new Date).getTime(),
                        x: e.x,
                        y: e.y
                    });
                    cxt.putImageData(mycanvasdata, 0, 0);
                    $.drawBLine(MyPoint);
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .2) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .1) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else {
                    cxt.closePath();
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                }
            }
            pp = false
        });
        $("body").mousedown(function (a) {
            cxt.lineCap = "round";
            cxt.lineJoin = "round";
            cxt.beginPath();
            var e = a.pageX - mycanvas.offsetLeft;
            var t = a.pageY - mycanvas.offsetTop;
            pp = true;
            cxt.moveTo(e, t);
            if (MyPen > .9) {
                penweight = $.rnd(1, 9);
                if (Math.random() > .8) {
                    if (Math.random() > .2) {
                        lineMax = Math.random() * 160 + 40
                    }
                    if (Math.random() > .2) {
                        lineMin = Math.random() * 10 + .5
                    }
                    if (Math.random() > .2) {
                        linePressure = Math.random() * 6
                    }
                    if (Math.random() > .2) {
                        smoothness = Math.random() * 160 + 40
                    }
                }
                if (Math.random() > .5) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
                has = [];
                upof = $.getXY(a)
            } else if (MyPen > .8) {
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            } else if (MyPen > .7) {
                cxt.putImageData(mycanvasdata, 0, 0);
                if (IsPC()) {
                    mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                }
                MyPoint = [];
                upof = $.getXY(a);
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            } else if (MyPen > .6) {
                if (MyPen > .65) {
                    if (Math.random() > .6) {
                        cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                    }
                    icwcc2 = Math.random() * 13
                } else {
                    if (Math.random() > .6) {
                        cxt.fillStyle = cxt.strokeStyle = $.rndcolor2()
                    }
                    icwcc2 = Math.random() * 13
                }
            } else if (MyPen > .5) {
                penweight = $.rnd(1, 9);
                if (Math.random() > .8) {
                    if (Math.random() > .2) {
                        lineMax = Math.random() * 160 + 40
                    }
                    if (Math.random() > .2) {
                        lineMin = Math.random() * 1 + .5
                    }
                    if (Math.random() > .2) {
                        linePressure = Math.random() * 6
                    }
                    if (Math.random() > .2) {
                        smoothness = Math.random() * 160 + 40
                    }
                }
                if (Math.random() > .5) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor3()
                }
                has = [];
                radius = lineMin;
                upof = $.getXY(a)
            } else if (MyPen > .4) {
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
                if (MyPen > .45) {} else {
                    upof = $.getXY(a);
                    cxt.lineWidth = .1;
                    cxt.moveTo(e, t)
                }
            } else if (MyPen > .3) {
                cxt.putImageData(mycanvasdata, 0, 0);
                if (IsPC()) {
                    mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                }
                MyPoint = [];
                upof = $.getXY(a);
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            } else if (MyPen > .2) {
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            } else if (MyPen > .1) {
                if (Math.random() > .8) {
                    if (Math.random() > .2) {
                        lineMax = Math.random() * 160 + 40
                    }
                    if (Math.random() > .2) {
                        lineMin = Math.random() * 10 + .5
                    }
                    if (Math.random() > .2) {
                        linePressure = Math.random() * 6
                    }
                    if (Math.random() > .2) {
                        smoothness = Math.random() * 160 + 40
                    }
                }
                if (Math.random() > .5) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor2()
                }
                has = [];
                upof = $.getXY(a)
            } else {
                if (Math.random() > .6) {
                    cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
                }
            }
            requestAnimationFrame($.printerstep)
        });
        $("body").mouseup(function (a) {
            if (pp) {
                if (MyPen > .9) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .8) {
                    cxt.fill();
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .7) {
                    var e = $.getXY(a);
                    MyPoint.push({
                        time: (new Date).getTime(),
                        x: e.x,
                        y: e.y
                    });
                    cxt.putImageData(mycanvasdata, 0, 0);
                    $.drawBLine2(MyPoint);
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .6) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .5) {
                    has = [];
                    upof = $.getXY(a);
                    radius = lineMin;
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .4) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .3) {
                    var e = $.getXY(a);
                    MyPoint.push({
                        time: (new Date).getTime(),
                        x: e.x,
                        y: e.y
                    });
                    cxt.putImageData(mycanvasdata, 0, 0);
                    $.drawBLine(MyPoint);
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .2) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .1) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else {
                    cxt.closePath();
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                }
            }
            pp = false
        });
        $("body,html").mouseleave(function (a) {
            if (pp) {
                if (MyPen > .9) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .8) {
                    cxt.fill();
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .7) {
                    var e = $.getXY(a);
                    MyPoint.push({
                        time: (new Date).getTime(),
                        x: e.x,
                        y: e.y
                    });
                    cxt.putImageData(mycanvasdata, 0, 0);
                    $.drawBLine2(MyPoint);
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .6) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .5) {
                    has = [];
                    upof = $.getXY(a);
                    radius = lineMin;
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .4) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .3) {
                    var e = $.getXY(a);
                    MyPoint.push({
                        time: (new Date).getTime(),
                        x: e.x,
                        y: e.y
                    });
                    cxt.putImageData(mycanvasdata, 0, 0);
                    $.drawBLine(MyPoint);
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .2) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else if (MyPen > .1) {
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                } else {
                    cxt.closePath();
                    if (IsPC()) {
                        mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
                    }
                }
            }
            pp = false
        });
        $("body").mousemove(function (a) {
            var e = a.pageX - mycanvas.offsetLeft;
            var t = a.pageY - mycanvas.offsetTop;
            var i = 3;
            if (pp) {
                if (MyPen > .9) {
                    var n = $.getXY(a);
                    var r = upof;
                    var o = radius;
                    olddis = $.distance(r, n);
                    if (has.length < 4) {
                        olddis = smoothness / 4
                    }
                    has.unshift({
                        time: (new Date).getTime(),
                        dis: olddis
                    });
                    var s = 0;
                    var c = 0;
                    for (var h = 0; h < has.length - 1; h++) {
                        s += has[h].dis;
                        c += has[h].time - has[h + 1].time;
                        if (s > smoothness) break
                    }
                    var m = Math.min(c / s * linePressure + lineMin, lineMax) / 2;
                    radius = m;
                    upof = n;
                    if (has.length > 4) {
                        var d = Math.round(has[0].dis / 2) + 1;
                        for (var l = 0; l < d; l++) {
                            var f = r.x + (n.x - r.x) / d * l;
                            var y = r.y + (n.y - r.y) / d * l;
                            var v = o + (m - o) / d * l;
                            $.fillRectM(f, y, v)
                        }
                    }
                } else if (MyPen > .8) {
                    cxt.lineTo(e, t);
                    cxt.stroke()
                } else if (MyPen > .7) {
                    cxt.lineTo(e, t);
                    cxt.stroke();
                    var u = $.getXY(a);
                    if (MyPoint.length == 0) {
                        MyPoint.push({
                            time: (new Date).getTime(),
                            x: u.x,
                            y: u.y
                        })
                    } else {
                        if (upof != u) {
                            MyPoint.push({
                                time: (new Date).getTime(),
                                x: u.x,
                                y: u.y
                            })
                        }
                    }
                    upof = u
                } else if (MyPen > .6) {
                    i = $.rnd(1, icwcc4);
                    for (var l = 0; l < i; l++) {
                        icwcc = Math.random() * icwcc2;
                        cxt.beginPath();
                        cxt.moveTo(e + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5), t + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5));
                        cxt.arc(e + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5), t + $.rnd(1, icwcc2 * icwcc3) * (Math.random() - .5), icwcc, 0, Math.PI * 2, true);
                        cxt.closePath();
                        cxt.fill()
                    }
                    oldpoint.x = e;
                    oldpoint.y = t
                } else if (MyPen > .5) {
                    var n = $.getXY(a);
                    var r = upof;
                    var o = radius;
                    olddis = $.distance(r, n);
                    if (has.length < 4) {
                        olddis = smoothness / 4
                    }
                    has.unshift({
                        time: (new Date).getTime(),
                        dis: olddis
                    });
                    var s = 0;
                    var c = 0;
                    for (var h = 0; h < has.length - 1; h++) {
                        s += has[h].dis;
                        c += has[h].time - has[h + 1].time;
                        if (s > smoothness) break
                    }
                    var m = Math.min(c / s * linePressure + lineMin, lineMax) / 2;
                    radius = m;
                    upof = n;
                    if (has.length > 4) {
                        var d = Math.round(has[0].dis / 2) + 1;
                        for (var l = 0; l < d; l++) {
                            var f = r.x + (n.x - r.x) / d * l;
                            var y = r.y + (n.y - r.y) / d * l;
                            var v = o + (m - o) / d * l;
                            $.fillRC(f, y, v)
                        }
                    }
                } else if (MyPen > .4) {
                    if (MyPen > .45) {
                        cxt.lineTo(e, t);
                        if (Math.random() > .9) {
                            i = $.rnd(0, 3);
                            for (var l = 0; l < i; l++) {
                                cxt.arc(e + $.rnd(10, 20) * (Math.random() - .5), t + $.rnd(10, 20) * (Math.random() - .5), icwcc, 0, Math.PI * (2 * Math.random()), true)
                            }
                        }
                        cxt.stroke()
                    } else {
                        var g = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                        var w = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                        if (MyPen > .425) {
                            cxt.moveTo(upof.x + g, upof.y + w)
                        } else if (MyPen > .4125) {
                            cxt.moveTo(upof.x - g, upof.y + g)
                        } else {
                            cxt.moveTo(upof.x + g, upof.y + g)
                        }
                        g = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                        w = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                        if (MyPen > .425) {
                            cxt.lineTo(e + g, t + w)
                        } else if (MyPen > .4125) {
                            cxt.lineTo(e + g, t - g)
                        } else {
                            cxt.lineTo(e + g, t + g)
                        }
                        var x = $.rnd(1, 5);
                        for (var l = 0; l < x; l++) {
                            g = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                            w = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                            if (MyPen > .425) {
                                cxt.moveTo(upof.x + g, upof.y + w)
                            } else if (MyPen > .4125) {
                                cxt.moveTo(upof.x - g, upof.y + g)
                            } else {
                                cxt.moveTo(upof.x + g, upof.y + g)
                            }
                            g = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                            w = Math.random() * ($.rnd(1, 13) - 6.5) * linePressure;
                            if (MyPen > .425) {
                                cxt.lineTo(e + g, t + w)
                            } else if (MyPen > .4125) {
                                cxt.lineTo(e + g, t - g)
                            } else {
                                cxt.lineTo(e + g, t + g)
                            }
                        }
                        if (Math.random() > .9) {
                            i = $.rnd(0, 3);
                            for (var l = 0; l < i; l++) {
                                cxt.arc(e + $.rnd(10, 20) * (Math.random() - .5), t + $.rnd(10, 20) * (Math.random() - .5), icwcc, 0, Math.PI * (2 * Math.random()), true)
                            }
                        }
                        cxt.stroke();
                        upof = $.getXY(a)
                    }
                } else if (MyPen > .3) {
                    cxt.lineTo(e, t);
                    cxt.stroke();
                    var u = $.getXY(a);
                    if (MyPoint.length == 0) {
                        MyPoint.push({
                            time: (new Date).getTime(),
                            x: u.x,
                            y: u.y
                        })
                    } else {
                        if (upof != u) {
                            MyPoint.push({
                                time: (new Date).getTime(),
                                x: u.x,
                                y: u.y
                            })
                        }
                    }
                    upof = u
                } else if (MyPen > .2) {
                    cxt.lineTo(e, t);
                    cxt.stroke()
                } else if (MyPen > .1) {
                    var n = $.getXY(a);
                    var r = upof;
                    var o = radius;
                    olddis = $.distance(r, n);
                    if (has.length < 4) {
                        olddis = smoothness / 4
                    }
                    has.unshift({
                        time: (new Date).getTime(),
                        dis: olddis
                    });
                    var s = 0;
                    var c = 0;
                    for (var h = 0; h < has.length - 1; h++) {
                        s += has[h].dis;
                        c += has[h].time - has[h + 1].time;
                        if (s > smoothness) break
                    }
                    var m = Math.min(c / s * linePressure + lineMin, lineMax) / 2;
                    radius = m;
                    upof = n;
                    if (has.length > 4) {
                        var d = Math.round(has[0].dis / 2) + 1;
                        for (var l = 0; l < d; l++) {
                            var f = r.x + (n.x - r.x) / d * l;
                            var y = r.y + (n.y - r.y) / d * l;
                            var v = o + (m - o) / d * l;
                            cxt.beginPath();
                            cxt.arc(f, y, v, 0, 2 * Math.PI, true);
                            cxt.fill()
                        }
                    }
                } else {
                    cxt.lineTo(e + $.rnd(10, 20) * (Math.random() - .5), t + $.rnd(10, 20) * (Math.random() - .5));
                    if (Math.random() > .9) {
                        i = $.rnd(0, 3);
                        for (var l = 0; l < i; l++) {
                            cxt.arc(e + $.rnd(10, 20) * (Math.random() - .5), t + $.rnd(10, 20) * (Math.random() - .5), icwcc, 0, Math.PI * (2 * Math.random()), true)
                        }
                    }
                    cxt.stroke()
                }
            }
        });
        $("#mylogoshowbtn").click(function () {
            if (myShowMenu == true) {
                myShowMenu = false;
                $("#mymenu").hide()
            } else {
                myShowMenu = true;
                $("#mymenu").show()
            }
            $.cookie("miaoxiaoercom_myShowMenu", myShowMenu)
        });
        $("#myinputshowbtn").click(function () {
            $("#myinputshowbtn").hide();
            $.showInputBox()
        });
        $("#myinput").keydown(function (a) {
            chenmotimer = chenmotimermax;
            chenmotimerlimit = Math.ceil(Math.random() * 4) + 2;
            var e = a.which;
            if (e == 13) {}
            var t = wordsave.length - 1;
            var i = false;
            if (e == 38) {
                for (var n = 0; n < wordsave.length; n++) {
                    if ($("#myinput").val() == wordsave[n]) {
                        t = n;
                        i = true
                    }
                }
                if (i == true) {
                    if (t >= 1) {
                        t -= 1
                    }
                }
                if (wordsave.length > 0) {
                    $("#myinput").val(wordsave[t])
                }
            }
            if (e == 40) {
                var t = wordsave.length - 1;
                for (var n = 0; n < wordsave.length; n++) {
                    if ($("#myinput").val() == wordsave[n]) {
                        t = n
                    }
                }
                if (t >= 1) {
                    t += 1
                }
                if (wordsave.length > t) {
                    $("#myinput").val(wordsave[t])
                }
            }
        });
        $("#myinput").focus(function (a) {
            if (getBrowser() == "ie") {
                $("#mysendbtn").fadeOut()
            }
        });
        $("#myinput").blur(function (a) {
            if (getBrowser() == "ie") {
                $("#mysendbtn").fadeIn()
            }
        })
    }, getov: function (a, e) {
        if (a == e) {
            return 0
        } else {
            if (a.x >= e.x && a.y >= e.y) {
                return 1
            } else if (a.x < e.x && a.y >= e.y) {
                return 2
            } else if (a.x < e.x && a.y < e.y) {
                return 3
            } else if (a.x >= e.x && a.y < e.y) {
                return 4
            } else {
                return 0
            }
        }
    }, optimizeBLine: function (a) {
        var e = [];
        var t = 1;
        var i = 99999;
        var n = 99999;
        var r = 0;
        var o = 0;
        for (var s = 0; s < a.length; s++) {
            if (s == 0) {
                e.push(a[0])
            }
            if (s < a.length - 1) {
                if (s % 5 == 0) {
                    e.push(a[s])
                }
            }
        }
        ijuli = 0;
        for (var s = 0; s < e.length - 1; s++) {
            ijuli += Math.sqrt((e[s].x - e[s + 1].x) * (e[s].x - e[s + 1].x) + (e[s].y - e[s + 1].y) * (e[s].y - e[s + 1].y))
        }
        e.push(a[a.length - 1]);
        return e
    }, drawBLine: function (a) {
        a = $.optimizeBLine(a);
        var e = .6;
        var t = a.length;
        var i = [];
        for (var n = 0; n < t; n++) {
            var r = (n + 1) % t;
            if (n == t - 1) {
                r = t - 1
            }
            i.push({
                x: (a[n].x + a[r].x) / 2,
                y: (a[n].y + a[r].y) / 2
            })
        }
        var o = [];
        for (var n = 0; n < t * 2; n++) {
            o.push({})
        }
        for (var n = 0; n < t; n++) {
            var r = (n + 1) % t;
            var s = (n + t - 1) % t;
            if (n == 0) {
                s = 0
            }
            if (n == t - 1) {
                r = t - 1
            }
            var c = {};
            c.x = (i[n].x + i[s].x) / 2;
            c.y = (i[n].y + i[s].y) / 2;
            var h = a[n].x - c.x;
            var m = a[n].y - c.y;
            var d = 2 * n;
            o[d].x = i[s].x + h;
            o[d].y = i[s].y + m;
            var l = (o[d].x - a[n].x) * e;
            var f = (o[d].y - a[n].y) * e;
            o[d].x = a[n].x + l;
            o[d].y = a[n].y + f;
            var y = (d + 1) % (2 * t);
            o[y].x = i[n].x + h;
            o[y].y = i[n].y + m;
            l = (o[y].x - a[n].x) * e;
            f = (o[y].y - a[n].y) * e;
            o[y].x = a[n].x + l;
            o[y].y = a[n].y + f
        }
        var v = [];
        for (var n = 0; n < 4; n++) {
            v.push({})
        }
        var u = "";
        lineWidthTemp = cxt.lineWidth;
        cxt.lineWidth = $.rnd(1, 100) / 10;
        if (cxt.lineWidth < 1) cxt.lineWidth = 1;
        penweight = $.rnd(1, 23);
        for (var n = 0; n < t; n++) {
            v[0] = a[n];
            var d = 2 * n;
            v[1] = o[d + 1];
            var y = (d + 2) % (2 * t);
            v[2] = o[y];
            var r = (n + 1) % t;
            if (r != 0) {
                v[3] = a[r];
                $.sbezierCurveDraw(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y)
            }
        }
        cxt.lineWidth = lineWidthTemp;
        if (cxt.lineWidth < 1) cxt.lineWidth = 1
    }, drawBLine2: function (a) {
        a = $.optimizeBLine(a);
        var e = .6;
        var t = a.length;
        var i = [];
        for (var n = 0; n < t; n++) {
            var r = (n + 1) % t;
            if (n == t - 1) {
                r = t - 1
            }
            i.push({
                x: (a[n].x + a[r].x) / 2,
                y: (a[n].y + a[r].y) / 2
            })
        }
        var o = [];
        for (var n = 0; n < t * 2; n++) {
            o.push({})
        }
        for (var n = 0; n < t; n++) {
            var r = (n + 1) % t;
            var s = (n + t - 1) % t;
            if (n == 0) {
                s = 0
            }
            if (n == t - 1) {
                r = t - 1
            }
            var c = {};
            c.x = (i[n].x + i[s].x) / 2;
            c.y = (i[n].y + i[s].y) / 2;
            var h = a[n].x - c.x;
            var m = a[n].y - c.y;
            var d = 2 * n;
            o[d].x = i[s].x + h;
            o[d].y = i[s].y + m;
            var l = (o[d].x - a[n].x) * e;
            var f = (o[d].y - a[n].y) * e;
            o[d].x = a[n].x + l;
            o[d].y = a[n].y + f;
            var y = (d + 1) % (2 * t);
            o[y].x = i[n].x + h;
            o[y].y = i[n].y + m;
            l = (o[y].x - a[n].x) * e;
            f = (o[y].y - a[n].y) * e;
            o[y].x = a[n].x + l;
            o[y].y = a[n].y + f
        }
        var v = [];
        for (var n = 0; n < 4; n++) {
            v.push({})
        }
        var u = "";
        lineWidthTemp = cxt.lineWidth;
        cxt.lineWidth = $.rnd(1, 100) / 10;
        if (cxt.lineWidth < 1) cxt.lineWidth = 1;
        penweight = $.rnd(1, 23);
        lightcolor = $.rndcolor5(cxt.fillStyle);
        darkcolor = $.rndcolor6(cxt.fillStyle);
        dushcolor = $.rndcolor4(cxt.fillStyle);
        for (var n = 0; n < t; n++) {
            v[0] = a[n];
            var d = 2 * n;
            v[1] = o[d + 1];
            var y = (d + 2) % (2 * t);
            v[2] = o[y];
            var r = (n + 1) % t;
            if (r != 0) {
                v[3] = a[r];
                $.sbezierCurveDraw2(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y)
            }
        }
        cxt.lineWidth = lineWidthTemp;
        if (cxt.lineWidth < 1) cxt.lineWidth = 1
    }, sbezierCurveDraw: function (a, e, t, i, n, r, o, s) {
        function c(a, e, t, i, n, r, o, s, c) {
            function h(a, e, t, i, n) {
                var r = 1 - n;
                return r * r * r * a + 3 * e * n * r * r + 3 * t * n * n * r + i * n * n * n
            }
            var m = {};
            m.x = h(a, t, n, o, c);
            m.y = h(e, i, r, s, c);
            return m
        }
        var h;
        var m;
        var d = 100;
        h = 1 / (d - 1);
        for (m = 0; m < d; m++) {
            var l = c(a, e, t, i, n, r, o, s, m * h);
            var f = Math.abs(m * h - .5 * h * d) * Math.sin(Math.random());
            cxt.beginPath();
            cxt.arc(l.x, l.y, f * penweight * Math.random(), 0, 2 * Math.PI, true);
            cxt.fill();
            cxt.closePath()
        }
    }, sbezierCurveDraw2: function (a, e, t, i, n, r, o, s) {
        function c(a, e, t, i, n, r, o, s, c) {
            function h(a, e, t, i, n) {
                var r, o, s;
                var c, h;
                s = 3 * (e - a);
                o = 3 * (t - e) - s;
                r = i - o - s - a;
                c = n * n;
                h = n * c;
                return r * h + o * c + s * n + a
            }
            var m = {};
            m.x = h(a, t, n, o, c);
            m.y = h(e, i, r, s, c);
            return m
        }
        var h;
        var m;
        var d = Math.random() * 400 + ijuli / 5 * Math.random() + 200;
        h = 1 / (d - 1);
        if (smoothness <= 120) {
            var l = Math.random() / 2;
            tempcolor = cxt.fillStyle;
            cxt.fillStyle = darkcolor;
            for (m = 0; m < d; m++) {
                var f = c(a, e, t, i, n, r, o, s, m * h);
                var y = Math.abs(m * h - .5 * h * d) * Math.random();
                var v = Math.random();
                var u = Math.random() * 7;
                var g = u;
                if (MyPen > .75) {
                    g = Math.random() * 7
                }
                cxt.beginPath();
                cxt.arc(f.x + u, f.y + g, y * 2, 0, 2 * Math.PI, true);
                cxt.closePath();
                cxt.fill()
            }
            cxt.fillStyle = tempcolor
        }
        for (m = 0; m < d; m++) {
            var f = c(a, e, t, i, n, r, o, s, m * h);
            var y = Math.abs(m * h - .5 * h * d) * Math.random();
            var v = Math.random();
            var u = (Math.random() - .5) * 5;
            var g = u;
            if (MyPen > .75) {
                g = (Math.random() - .5) * 5
            }
            var w = (Math.random() - .5) * 9;
            var x = w;
            if (MyPen > .75) {
                x = (Math.random() - .5) * 9
            }
            var M = (Math.random() - .5) * 3;
            var p = p;
            var $ = 0;
            if (MyPen > .75) {
                p = (Math.random() - .5) * 3
            }
            if (MyPen > .725) {
                g = -g;
                x = -x;
                p = -p
            }
            cxt.beginPath();
            cxt.arc(f.x, f.y, y * (linePressure + 2), 0, 2 * Math.PI, true);
            cxt.closePath();
            cxt.fill();
            cxt.beginPath();
            cxt.arc(f.x + u, f.y + g, v * linePressure, 0, 2 * Math.PI, true);
            cxt.closePath();
            cxt.fill();
            tempcolor = cxt.fillStyle;
            cxt.fillStyle = dushcolor;
            cxt.beginPath();
            cxt.arc(f.x + w, f.y + x, y * (linePressure + 2), 0, 2 * Math.PI, true);
            cxt.closePath();
            cxt.fill();
            cxt.fillStyle = tempcolor
        }
        if (smoothness > 120) {
            var l = Math.random() / 2;
            cxt.fillStyle = tempcolor;
            tempcolor = cxt.fillStyle;
            cxt.fillStyle = darkcolor;
            for (m = 0; m < d; m++) {
                var f = c(a, e, t, i, n, r, o, s, m * h);
                var y = Math.abs(m * h - .5 * h * d) * Math.random();
                var v = Math.random();
                var u = Math.random() * 5;
                var g = u;
                if (MyPen > .75) {
                    g = Math.random() * 5
                }
                cxt.beginPath();
                if (Math.random() < l) {
                    cxt.arc(f.x + u, f.y + g, Math.random(), 0, 2 * Math.PI, true)
                }
                cxt.closePath();
                cxt.fill()
            }
            cxt.fillStyle = tempcolor;
            tempcolor = cxt.fillStyle;
            cxt.fillStyle = lightcolor;
            l = Math.random() / 5;
            for (m = 0; m < d; m++) {
                var f = c(a, e, t, i, n, r, o, s, m * h);
                var y = Math.abs(m * h - .5 * h * d) * Math.random();
                var v = Math.random();
                var u = Math.random() * 3;
                var g = u;
                if (MyPen > .75) {
                    g = Math.random() * 3
                }
                cxt.beginPath();
                if (Math.random() < l) {
                    cxt.arc(f.x - u, f.y - g, Math.random(), 0, 2 * Math.PI, true)
                }
                cxt.closePath();
                cxt.fill()
            }
            cxt.fillStyle = tempcolor
        }
    }, fillRC: function (a, e, t) {
        var i;
        var n;
        for (var r = 0; r < 7; r++) {
            var o = t / 7 * r;
            if (o < .1) {
                o = .1
            }
            cxt.beginPath();
            cxt.arc(a, e, o, 0, 2 * Math.PI, true);
            cxt.closePath();
            cxt.fill();
            for (var s = 0; s < 7; s++) {
                cxt.beginPath();
                n = e + o * Math.sin($.rnd(0, 360) * Math.PI / 180);
                if (Math.random() > .5) {
                    i = a + Math.sqrt(o * o - (n - e) * (n - e))
                } else {
                    i = a - Math.sqrt(o * o - (n - e) * (n - e))
                }
                cxt.arc(i, n, Math.random() * Math.random() * Math.random() * s * r, 0, 2 * Math.PI, true);
                cxt.closePath();
                cxt.fill()
            }
        }
        cxt.fillStyle = tempcolor
    }, fillRectM: function (a, e, t) {
        var i;
        var n;
        for (var r = 0; r < penweight; r++) {
            cxt.beginPath();
            n = e + t * Math.sin($.rnd(0, 360) * Math.PI / 180);
            if (Math.random() > .5) {
                i = a + Math.sqrt(t * t - (n - e) * (n - e))
            } else {
                i = a - Math.sqrt(t * t - (n - e) * (n - e))
            }
            cxt.arc(i, n, Math.random(), 0, 2 * Math.PI, true);
            cxt.closePath();
            cxt.fill()
        }
    }, getXY: function (a) {
        return {
            x: a.pageX,
            y: a.pageY
        }
    }, distance: function (a, e) {
        var t = e.x - a.x,
            i = e.y - a.y;
        return Math.sqrt(t * t + i * i)
    }, ValidataMessage: function () {
        $("#myinput").val($("#myinput").val().replace(/['"\\]/g, ""));
        if ($("#myinput").val().length < 1) {
            return false
        } else {
            return true
        }
    }, NoSearch: function () {
        var ishoudaomiao = ["好的喵", "收到喵", "遵命喵", "好的", "遵命", "如你所愿", "如你所愿喵", "明白喵", "了解喵"];
        var ishoudaomiaostr = ishoudaomiao[Math.floor(Math.random() * ishoudaomiao.length)];
        var ireturns = false;
        var iinputstr = $("#myinput").val();
        iinputstr = iinputstr.toLowerCase();
        iinputstr = iinputstr.trim();
        var ibuzhou = 0;
        if (ibuzhou == 0) {
            var ifindinputky = false;
            var iinputky = false;
            var isearchvy = "";
            for (var k = 0; k < websitekeyword.length; k++) {
                if (ifindinputky == false) {
                    var ikarr2 = websitekeyword[k].k.split("|");
                    for (var h = 0; h < ikarr2.length; h++) {
                        if (ifindinputky == false) {
                            if (iinputstr == ikarr2[h]) {
                                ifindinputky = true;
                                iinputky = ikarr2[h];
                                isearchvy = websitekeyword[k].v
                            }
                        }
                    }
                }
            }
            if (ifindinputky == true) {
                ibuzhou = 1;
                $("#myinput").val("");
                $.showAMessage(ishoudaomiaostr, ishoudaomiaostr);
                if (isearchvy.indexOf("$.") >= 0) {
                    eval(isearchvy)
                } else {
                    window.open(isearchvy)
                }
                ireturns = true
            }
        }
        if (ibuzhou == 0) {
            var ifindinputkw = false;
            var iinputkw = false;
            var isearchv = "";
            for (var i = 0; i < searchkeyword.length; i++) {
                if (ifindinputkw == false) {
                    var ikarr = searchkeyword[i].k.split("|");
                    for (var j = 0; j < ikarr.length; j++) {
                        if (ifindinputkw == false) {
                            if (iinputstr.indexOf(ikarr[j]) == 0) {
                                ifindinputkw = true;
                                iinputkw = ikarr[j];
                                isearchv = searchkeyword[i].v
                            }
                        }
                    }
                }
            }
            if (ifindinputkw == true) {
                var izhengze = eval("/" + iinputkw + "/g");
                var searchword = iinputstr.replace(izhengze, "");
                isearchv = isearchv.replace(/miaoxiaoer/g, searchword);
                ibuzhou = 1;
                $("#myinput").val("");
                $.showAMessage(ishoudaomiaostr, ishoudaomiaostr);
                if (isearchv.indexOf("$.") >= 0) {
                    console.info(isearchv);
                    eval(isearchv)
                } else {
                    window.open(isearchv)
                }
                ireturns = true
            }
        }
        return ireturns
    }, SendChenmoMessage: function () {
        chenmotimer = chenmotimermax;
        var a = "./xiaoer.miao?action=webmessagechenmo&stm=" + Math.random();
        var e = "";
        $.hideInputBox();
        $("#myloadingbox").show();
        $("#mysee").html("");
        $.ajax({
            url: a,
            data: e,
            type: "Post",
            error: function (a, e, t) {
                $("#myloadingbox").hide();
                $.showInputBox();
                $.AddMessageRecorder("喵小二", "喵");
                $.showAMessage("喵", "喵")
            }, success: function (a) {
                $("#myloadingbox").hide();
                $.showInputBox();
                if (a.result == "喵") {
                    if (a.type == "message") {
                        $.AddMessageRecorder("喵小二", a.message);
                        $.showAMessage(a.message, a.pronunciation)
                    } else {
                        $.AddMessageRecorder("喵小二", "喵");
                        $.showAMessage("喵", "喵")
                    }
                } else if (a.result == "错误") {
                    $.AddMessageRecorder("喵小二", "错误");
                    $.showAMessage("错误", "错误")
                } else {
                    $.AddMessageRecorder("喵小二", "服务器的程序崩溃了");
                    $.showAMessage("服务器的程序崩溃了", "服务器的程序崩溃了")
                }
            }, dataType: "json"
        })
    }, SendMessage: function () {
        $.AddMessageRecorder("你", $("#myinput").val());
        var info =  $("#myinput").val();
        var a = "http://www.tuling123.com/openapi/api?key=f0feee3416c846a6be5fdc523b372c20&info=" + info;
        $.ajax({url:a,async:true,success:function(a){
            $("#myinput").val("");
            $.AddMessageRecorder("喵小二", a.text);
            $.showAMessage(a.text, "____")
        }});
/*
        var a = "./xiaoer.miao?action=webmessage&stm=" + Math.random();
        if (messageformSubmitResponse) {
            messageformSubmitResponse.abort()
        }
        if ($.ValidataMessage()) {
            wordsave.push($("#myinput").val());
            $.AddMessageRecorder("你", $("#myinput").val());
            if (!$.NoSearch()) {
               var e = $("#myinputform").serialize();
                $.hideInputBox();
                $("#myloadingbox").show();
                $("#mysee").html("");
                messageformSubmitResponse = $.ajax({
                    url: a,
                    data: e,
                    type: "Post",
                    error: function (a, e, t) {
                        $("#myloadingbox").hide();
                        $.showInputBox();
                        $.showAMessage("提交失败，请确保网络通畅", "喵喵，提交失败，请确保网络通畅")
                    }, success: function (a) {
                        $("#myloadingbox").hide();
                        $.showInputBox();
                        if (a.result == "喵") {
                            if (a.type == "message") {
                                $("#myinput").val("");
                                $.AddMessageRecorder("喵小二", a.message);
                                $.showAMessage(a.message, a.pronunciation)
                            } else if (a.type == "getgraphy") {} else {
                                $("#myinput").val("");
                                $.AddMessageRecorder("喵小二", "喵");
                                $.showAMessage("喵", "喵")
                            }
                        } else if (a.result == "错误") {
                            $.AddMessageRecorder("喵小二", "错误");
                            $.showAMessage("错误", "错误")
                        } else {
                            $.AddMessageRecorder("喵小二", "服务器的程序崩溃了");
                            $.showAMessage("服务器的程序崩溃了", "服务器的程序崩溃了");
                            alert(a.result)
                        }
                    }, dataType: "json"
                })
            }
        } else {
            $.showAMessage("字数不得少于一个字", "字数不得少于一个字");
            $("#myloadingbox").show();
            $("#mysee").html("")
        }*/
        return false
    }, rnd: function (a, e) {
        return a + Math.floor(Math.random() * (e - a + 1))
    }, rndcolor6: function (a) {
        var e = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var t = /^#([0-9a-fA-f]{4}|[0-9a-fA-f]{8})$/;
        var i = 0;
        var n = 0;
        var r = 0;
        var o = a.toLowerCase();
        if (o && e.test(o)) {
            if (o.length === 4) {
                var s = "#";
                for (var c = 1; c < 4; c += 1) {
                    s += o.slice(c, c + 1).concat(o.slice(c, c + 1))
                }
                o = s
            }
            var h = [];
            for (var c = 1; c < 7; c += 2) {
                h.push(parseInt("0x" + o.slice(c, c + 2)))
            }
            i = h[0];
            n = h[1];
            r = h[2]
        }
        if (/^(rgb)/.test(o)) {
            var m = o.replace(/(?:\(|\)|rgb|rgba)*/g, "").split(",");
            if (m.length == 3) {
                i = parseInt(m[0]);
                n = parseInt(m[1]);
                r = parseInt(m[2])
            }
            if (m.length == 4) {
                i = parseInt(m[0]);
                n = parseInt(m[1]);
                r = parseInt(m[2])
            }
        }
        i -= $.rnd(0, 50);
        n -= $.rnd(0, 50);
        r -= $.rnd(0, 50);
        if (i < 0) {
            i = 0
        }
        if (n < 0) {
            n = 0
        }
        if (r, 0) {
            r = 0
        }
        return "rgb(" + i + "," + n + "," + r + ")"
    }, rndcolor5: function (a) {
        var e = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var t = /^#([0-9a-fA-f]{4}|[0-9a-fA-f]{8})$/;
        var i = 0;
        var n = 0;
        var r = 0;
        var o = a.toLowerCase();
        if (o && e.test(o)) {
            if (o.length === 4) {
                var s = "#";
                for (var c = 1; c < 4; c += 1) {
                    s += o.slice(c, c + 1).concat(o.slice(c, c + 1))
                }
                o = s
            }
            var h = [];
            for (var c = 1; c < 7; c += 2) {
                h.push(parseInt("0x" + o.slice(c, c + 2)))
            }
            i = h[0];
            n = h[1];
            r = h[2]
        }
        if (/^(rgb)/.test(o)) {
            var m = o.replace(/(?:\(|\)|rgb|rgba)*/g, "").split(",");
            if (m.length == 3) {
                i = parseInt(m[0]);
                n = parseInt(m[1]);
                r = parseInt(m[2])
            }
            if (m.length == 4) {
                i = parseInt(m[0]);
                n = parseInt(m[1]);
                r = parseInt(m[2])
            }
        }
        i += $.rnd(0, 50);
        n += $.rnd(0, 50);
        r += $.rnd(0, 50);
        if (i > 255) {
            i = 255
        }
        if (n > 255) {
            n = 255
        }
        if (r > 255) {
            r = 255
        }
        return "rgb(" + i + "," + n + "," + r + ")"
    }, rndcolor4: function (a) {
        var e = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var t = /^#([0-9a-fA-f]{4}|[0-9a-fA-f]{8})$/;
        var i = 0;
        var n = 0;
        var r = 0;
        var o = a.toLowerCase();
        if (o && e.test(o)) {
            if (o.length === 4) {
                var s = "#";
                for (var c = 1; c < 4; c += 1) {
                    s += o.slice(c, c + 1).concat(o.slice(c, c + 1))
                }
                o = s
            }
            var h = [];
            for (var c = 1; c < 7; c += 2) {
                h.push(parseInt("0x" + o.slice(c, c + 2)))
            }
            i = h[0];
            n = h[1];
            r = h[2]
        }
        if (/^(rgb)/.test(o)) {
            var m = o.replace(/(?:\(|\)|rgb|rgba)*/g, "").split(",");
            if (m.length == 3) {
                i = parseInt(m[0]);
                n = parseInt(m[1]);
                r = parseInt(m[2])
            }
            if (m.length == 4) {
                i = parseInt(m[0]);
                n = parseInt(m[1]);
                r = parseInt(m[2])
            }
        }
        i += $.rnd(0, 10);
        n += $.rnd(0, 10);
        r += $.rnd(0, 10);
        if (i > 255) {
            i = 255
        }
        if (n > 255) {
            n = 255
        }
        if (r > 255) {
            r = 255
        }
        return "rgba(" + i + "," + n + "," + r + ", " + raincolora + ")"
    }, rndcolor3: function () {
        return "rgba(" + $.rnd(0, 255) + "," + $.rnd(0, 255) + "," + $.rnd(0, 255) + "," + $.rnd(1, 5) / 100 + ")"
    }, rndcolor2: function () {
        return "rgba(" + $.rnd(0, 255) + "," + $.rnd(0, 255) + "," + $.rnd(0, 255) + "," + $.rnd(5, 100) / 100 + ")"
    }, rndcolor22: function () {
        return "rgba(" + $.rnd(0, 255) + "," + $.rnd(0, 255) + "," + $.rnd(0, 255) + "," + $.rnd(5, 50) / 100 + ")"
    }, rndcolor: function () {
        return "rgba(" + $.rnd(0, 255) + "," + $.rnd(0, 255) + "," + $.rnd(0, 255) + ",1)"
    }, YellowBackground: function () {
        mycanvas.width = $(window).width();
        mycanvas.height = $(window).height();
        if (mycanvas.getContext) {
            cxt.fillStyle = "#ffff80";
            cxt.fillRect(0, 0, mycanvas.width, mycanvas.height);
            if (IsPC()) {
                mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
            }
        }
    }, GreenBackground: function () {
        mycanvas.width = $(window).width();
        mycanvas.height = $(window).height();
        if (mycanvas.getContext) {
            cxt.fillStyle = "#80ff80";
            cxt.fillRect(0, 0, mycanvas.width, mycanvas.height);
            if (IsPC()) {
                mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
            }
        }
    }, RedBackground: function () {
        mycanvas.width = $(window).width();
        mycanvas.height = $(window).height();
        if (mycanvas.getContext) {
            cxt.fillStyle = "#ff8080";
            cxt.fillRect(0, 0, mycanvas.width, mycanvas.height);
            if (IsPC()) {
                mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
            }
        }
    }, CyanBackground: function () {
        mycanvas.width = $(window).width();
        mycanvas.height = $(window).height();
        if (mycanvas.getContext) {
            cxt.fillStyle = "#90ffce";
            cxt.fillRect(0, 0, mycanvas.width, mycanvas.height);
            if (IsPC()) {
                mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
            }
        }
    }, BlueBackground: function () {
        mycanvas.width = $(window).width();
        mycanvas.height = $(window).height();
        if (mycanvas.getContext) {
            cxt.fillStyle = "#00ccff";
            cxt.fillRect(0, 0, mycanvas.width, mycanvas.height);
            if (IsPC()) {
                mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
            }
        }
    }, CreatBackground: function () {
        mycanvas.width = $(window).width();
        mycanvas.height = $(window).height();
        if (mycanvas.getContext) {
            MyPen = Math.random();
            if (!IsPC()) {
                if (MyPen > .9) {} else if (MyPen > .8) {} else if (MyPen > .7) {
                    MyPen = MyPen + .1
                } else if (MyPen > .6) {} else if (MyPen > .5) {
                    MyPen = MyPen + .1
                } else if (MyPen > .4) {} else if (MyPen > .3) {
                    MyPen = MyPen + .1
                } else if (MyPen > .2) {} else if (MyPen > .1) {} else {}
            }
            cxt.fillStyle = "#f7f7f7";
            cxt.fillRect(0, 0, mycanvas.width, mycanvas.height);
            var a = $.rnd(1e3, 1e4);
            if (mycanvas.width < 800) {
                a = $.rnd(500, 4e3)
            }
            if (Math.random() > .7) {
                a = a / 7
            }
            var e = $.rnd(3, 50);
            var t = $.rnd(3, 30);
            var i = $.rnd(3, 15);
            if (Math.random() > .5) {
                e = $.rnd(1, 13);
                t = $.rnd(1, 13);
                i = $.rnd(1, 5)
            }
            cxt.lineWidth = $.rnd(1, a) / 10;
            cxt.lineCap = "round";
            var n = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
            var r = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
            var o = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
            var s = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
            var c = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
            var h = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
            var m = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
            var d = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
            if (mycanvas.width < mycanvas.height) {
                n = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                r = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                o = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                s = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                c = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                h = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                m = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                d = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
            }
            var l = $.rnd(1, 30);
            if (Math.random() > .6) {
                for (var f = 0; f < t; f++) {
                    l = $.rnd(1, 1e3) / 10;
                    if (Math.random() > .7) {
                        l = l / 3
                    }
                    n = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    r = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    if (mycanvas.width < mycanvas.height) {
                        n = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                        r = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
                    }
                    cxt.beginPath();
                    cxt.arc(n, r, l, 0, Math.PI * 2, true);
                    if (Math.random() > .6) {
                        cxt.fillStyle = $.rndcolor()
                    }
                    cxt.fill();
                    cxt.closePath()
                }
            }
            cxt.strokeStyle = $.rndcolor();
            cxt.beginPath();
            cxt.moveTo(n, r);
            cxt.bezierCurveTo(o, s, c, h, m, d);
            cxt.closePath();
            var y = 0;
            for (var v = 0; v < i; v++) {
                if (a < 500) {
                    if (Math.random() > .6) {
                        a = a / $.rnd(5, 10) * $.rnd(1, 5)
                    } else {
                        a = a / $.rnd(5, 6) * $.rnd(3, 4)
                    }
                } else {
                    a = a / $.rnd(5, 10) * $.rnd(1, 5)
                } if (a < 1) a = 1;
                cxt.lineWidth = $.rnd(1, a) / 10;
                if (cxt.lineWidth < 1) {
                    y += $.rnd(1, 3);
                    if (y > 6) {
                        break
                    }
                }
                if (Math.random() > .6) {
                    cxt.moveTo($.rnd(0 - mycanvas.width, mycanvas.width * 2), $.rnd(0 - mycanvas.height, mycanvas.height * 2))
                }
                if (mycanvas.width > mycanvas.height) {
                    n = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    r = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    o = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    s = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    c = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    h = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    m = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    d = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
                } else {
                    n = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    r = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    o = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    s = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    c = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    h = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    m = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    d = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
                } if (Math.random() > .6) {
                    cxt.strokeStyle = $.rndcolor()
                }
                cxt.beginPath();
                cxt.moveTo(n, r);
                cxt.bezierCurveTo(o, s, c, h, m, d);
                cxt.stroke();
                cxt.closePath();
                l = cxt.lineWidth + 1;
                n = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                r = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                if (mycanvas.width < mycanvas.height) {
                    n = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    r = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
                }
                cxt.beginPath();
                cxt.arc(n, r, l, 0, Math.PI * 2, true);
                cxt.closePath();
                cxt.fill()
            }
            for (var u = 0; u < e; u++) {
                l = $.rnd(1, 100) / 10;
                n = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                r = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                cxt.beginPath();
                cxt.arc(n, r, l, 0, Math.PI * 2, true);
                cxt.closePath();
                if (Math.random() > .6) {
                    cxt.fillStyle = $.rndcolor()
                }
                cxt.fill()
            }
        }
        cxt.lineCap = "round";
        cxt.lineJoin = "round";
        cxt.beginPath();
        if (MyPen > .9) {
            penweight = $.rnd(1, 9);
            lineMax = Math.random() * 160 + 40;
            lineMin = Math.random() * 10 + .5;
            linePressure = Math.random() * 6;
            smoothness = Math.random() * 160 + 40;
            cxt.fillStyle = cxt.strokeStyle = $.rndcolor();
            has = []
        } else if (MyPen > .8) {
            cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
        } else if (MyPen > .6) {
            if (MyPen > .65) {
                cxt.fillStyle = cxt.strokeStyle = $.rndcolor();
                icwcc2 = Math.random() * 13
            } else {
                cxt.fillStyle = cxt.strokeStyle = $.rndcolor22();
                icwcc2 = Math.random() * 13
            }
        } else if (MyPen > .5) {
            penweight = $.rnd(1, 9);
            lineMax = Math.random() * 160 + 40;
            lineMin = Math.random() * 10 + .5;
            linePressure = Math.random() * 6;
            smoothness = Math.random() * 160 + 40;
            cxt.fillStyle = cxt.strokeStyle = $.rndcolor3();
            has = []
        } else if (MyPen > .4) {
            cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
        } else if (MyPen > .3) {
            MyPoint = [];
            cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
        } else if (MyPen > .2) {
            cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
        } else if (MyPen > .1) {
            lineMax = Math.random() * 160 + 40;
            lineMin = Math.random() * 10 + .5;
            linePressure = Math.random() * 6;
            smoothness = Math.random() * 160 + 40;
            cxt.fillStyle = cxt.strokeStyle = $.rndcolor2();
            has = []
        } else {
            cxt.fillStyle = cxt.strokeStyle = $.rndcolor()
        } if (IsPC()) {
            mycanvasdata = cxt.getImageData(0, 0, mycanvas.width, mycanvas.height)
        }
    }, MyResize: function () {
        clearTimeout(MyResizingId);
        MyResizingId = setTimeout("$.MyPageLayoutInit()", 200)
    }, MyPageLayoutInit: function () {
        if (MyResizing == false) {
            MyResizing = true;
            $.CreatBackground();
            $("#messagerecorder ul").css({
                height: $("#messagerecorder").height() - 100
            });
            MyResizing = false
        }
    }, GetWeather: function () {
        /*var a = "./data/miaoworld/weather.json?stm=" + Math.random();
        messageformWeatherResponse = $.ajax({
            url: a,
            data: "",
            type: "Get",
            error: function (a, e, t) {}, success: function (a) {
                var e = "晴";
                var t = 10;
                var i = "0";
                if (typeof a.result.temp != "undefined") {
                    t = a.result.temp
                }
                if (typeof a.result.img != "undefined") {
                    i = a.result.img;
                    var n = new Date;
                    var r = n.getHours();
                    if (r < 6 || r > 18) {
                        $("#myweatherimg").attr("src", "./images/weathercn01/" + i + ".png")
                    } else {
                        $("#myweatherimg").attr("src", "./images/weathercn02/" + i + ".png")
                    }
                }
                if (typeof a.result.weather != "undefined") {
                    e = a.result.weather
                }
                if (a.result.weather == "晴") {}
            }, dataType: "json"
        })*/
    }, getUnique: function (a, e) {
        var t = 2;
        if (typeof e === "number") {
            t = e
        }
        var i = a.slice(0);
        for (var n = i.length - 1; n > t; n--) {
            var r = true;
            for (var o = 0; o < t - 1; o++) {
                if (i[n] != i[n - 1 - o]) {
                    r = false
                }
            }
        }
        return i
    }, ViewSource: function () {
        $.get(window.location.href, function (a) {
            var e = new Blob([a], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(e, "source.txt")
        })
    }, ShowMessageRecorder: function () {
        $("#messagerecorder").show()
    }, CloseMessageRecorder: function () {
        $("#messagerecorder").hide()
    }, AddMessageRecorder: function (a, e) {
        if (a == "喵小二") {
            $("#messagerecorder ul").append('<li class="mra">' + $.getNowFormatDate() + " " + a + "：" + e + "</li>")
        } else {
            $("#messagerecorder ul").append('<li class="mrb">' + $.getNowFormatDate() + " " + a + "：" + e + "</li>")
        }
    }, getNowFormatDate: function () {
        var a = new Date;
        var e = "-";
        var t = ":";
        var i = a.getMonth() + 1;
        var n = a.getDate();
        if (i >= 1 && i <= 9) {
            i = "0" + i
        }
        if (n >= 0 && n <= 9) {
            n = "0" + n
        }
        var r = a.getHours() + t + a.getMinutes() + t + a.getSeconds();
        return r
    }
});
$(function () {
    $.cookie("miaoxiaoercom_SatisfactionSubmited", MySatisfactionSubmited);
    var a = $.cookie("miaoxiaoercom_SatisfactionSubmited");
    if (typeof a == "string") {
        if (a == "已经提交了") {
            MySatisfactionSubmited = a
        } else {
            MySatisfactionSubmited = "未提交"
        }
    }
    var e = $.cookie("miaoxiaoercom_myParallaxBarrierEffect");
    if (typeof e == "string") {
        if (e.toLowerCase() == "true") {
            myParallaxBarrierEffect = true
        } else {
            myParallaxBarrierEffect = false
        }
    }
    var t = $.cookie("miaoxiaoercom_myShowMenu");
    if (typeof t == "string") {
        if (t.toLowerCase() == "true") {
            myShowMenu = true;
            $("#mymenu").show()
        } else {
            myShowMenu = false;
            $("#mymenu").hide()
        }
    } else {
        myShowMenu = false;
        $.cookie("miaoxiaoercom_myShowMenu", myShowMenu);
        $("#mymenu").hide()
    }
    $.initPageEvent();
    $.MyPageLayoutInit();
    $(window).resize(function () {
        $.MyResize()
    });
    if (!IsPC()) {
        if (MyPen > .9) {} else if (MyPen > .8) {} else if (MyPen > .7) {
            MyPen = MyPen + .1
        } else if (MyPen > .6) {} else if (MyPen > .5) {
            MyPen = MyPen + .1
        } else if (MyPen > .4) {} else if (MyPen > .3) {
            MyPen = MyPen + .1
        } else if (MyPen > .2) {} else if (MyPen > .1) {} else {}
        $(".my_svg").each(function(){
            $(this).attr("src", $(this).attr("data")+"_32.svg");
        })
        $("#mymenu").css("top","45px");
        $("#mymenu2").css("right","20px");
        $("#mymenu").children("li").css("height","40px");
    } else {
        $.GetWeather();
        //$("#myanimatemiaoxiaoer").css("background-image", "url(./images/gif/yemeng_1.gif)")
        if (getBrowser() == "ie") {
            $("#myanimatemiaoxiaoer").css("background-image", "url(./images/gif/yemeng_" + Math.ceil(Math.random() * 19) + ".gif)")
        } else {
            $("#myanimatemiaoxiaoer").css("background-image", "url(./images/webp/yemeng_" + Math.ceil(Math.random() * 19) + ".webp)")
        }
        $(".my_svg").each(function(){
            $(this).attr("src", $(this).attr("data")+"_64.svg");
        });
    }
    var i = ['<a href="feedback.html" title="评分">嘎嘎嘎，欢迎你，快来夸夸我~ <span class="fa fa-heart"></span></a>',
             '<a href="how.html" title="怎么用" target="_blank">不会用吗？看看使用说明呗~ <span class="fa fa-question-circle"></span></a>', 
             '<a href="changyan.html" title="评论" target="_blank">看这么久，不想说两句么~ <span class="fa fa-comment-o"></span></a>'];
    var n = Math.floor(Math.random() * i.length);
    $(".sendtext").html(i[n]);
    $("#mysee").show();
    $.showWelcomeMessage();
    $.ChenmoInit()
});