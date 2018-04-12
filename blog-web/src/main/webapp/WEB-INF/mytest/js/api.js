/**
 * Created by pengrz on 2018/4/11.
 */
"use strict";

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break
        }
    }
    return flag
}
function getBrowser(getVersion) {
    var ua_str = navigator.userAgent.toLowerCase(),
        ie_Tridents, trident, match_str, ie_aer_rv, browser_chi_Type;
    if ("ActiveXObject" in self) {
        ie_aer_rv = (match_str = ua_str.match(/msie ([\d.]+)/)) ? match_str[1] : (match_str = ua_str.match(/rv:([\d.]+)/)) ? match_str[1] : 0;
        ie_Tridents = {
            "trident/7.0": 11,
            "trident/6.0": 10,
            "trident/5.0": 9,
            "trident/4.0": 8
        };
        trident = (match_str = ua_str.match(/(trident|edge\/[\d.]+)/)) ? match_str[1] : undefined;
        browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0 ? "ie" : undefined
    } else {
        browser_chi_Type = (match_str = ua_str.match(/edge\/([\d.]+)/)) ? "ie" : (match_str = ua_str.match(/firefox\/([\d.]+)/)) ? "firefox" : (match_str = ua_str.match(/chrome\/([\d.]+)/)) ? "chrome" : (match_str = ua_str.match(/opera.([\d.]+)/)) ? "opera" : (match_str = ua_str.match(/version\/([\d.]+).*safari/)) ? "safari" : undefined
    }
    if (getVersion != undefined && match_str[1]) {
        return browser_chi_Type + "/" + match_str[1]
    } else {
        return browser_chi_Type
    }
}
var myspeedhuadong = 1;
var juli = 0;
var juli2 = 0;
var myParallaxBarrierEffect = false;
var table = [];
$("#hudongdata .hudongdata_item").each(function(index, ele) {
    table.push($(ele).children(".hudongdata_title").text());
    table.push($(ele).children(".hudongdata_type").text());
    table.push($(ele).children(".hudongdata_date").text());
    table.push($(ele).children(".hudongdata_value").attr("href"))
});
var camera, scene, renderer;
var controls;
var objects = [];
var targets = {
    helix: []
};

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1e4);
    camera.position.z = 2100;
    scene = new THREE.Scene;
    for (var i = 0; i < table.length; i += 4) {
        var element = document.createElement("div");
        element.className = "element";
        element.style.backgroundColor = "rgba(255,255,255,1)";
        var number = document.createElement("div");
        number.className = "number";
        number.textContent = i / 4 + 1;
        element.appendChild(number);
        var symbol = document.createElement("div");
        symbol.className = "symbol";
        symbol.textContent = table[i];
        symbol.title = table[i + 3];
        element.appendChild(symbol);
        var details = document.createElement("div");
        details.className = "details";
        details.innerHTML = table[i + 1] + "<br>" + table[i + 2];
        element.appendChild(details);
        element.addEventListener("click", function(event) {
            window.open($(this).children(".symbol").attr("title"))
        }, false);
        element.addEventListener("mouseover", function(event) {
            this.style.backgroundColor = "rgba(0,0,0,1)";
            this.style.color = "rgba(255,255,255,1)"
        }, false);
        element.addEventListener("mouseout", function(event) {
            this.style.backgroundColor = "rgba(255,255,255,1)";
            this.style.color = "rgba(0,0,0,1)"
        }, false);
        var object = new THREE.CSS3DObject(element);
        object.position.x = Math.random() * 4e3 - 2e3;
        object.position.y = Math.random() * 4e3 - 2e3;
        object.position.z = Math.random() * 4e3 - 2e3;
        scene.add(object);
        objects.push(object)
    }
    var vector = new THREE.Vector3;
    for (var i = 0, l = objects.length; i < l; i++) {
        var phi = i * .525 + Math.PI;
        var object = new THREE.Object3D;
        object.position.x = -900 * Math.sin(phi);
        object.position.y = -(i * 36) + 163;
        object.position.z = -900 * Math.cos(phi);
        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;
        object.lookAt(vector);
        targets.helix.push(object)
    }
    renderer = new THREE.CSS3DRenderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    document.getElementById("container").appendChild(renderer.domElement);
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = myspeedhuadong;
    controls.ROTATE = 180;
    controls.minDistance = 52;
    controls.maxDistance = 5200;
    controls.addEventListener("change", render);
    transform(targets.helix, 2e3);
    window.addEventListener("resize", onWindowResize, false)
}
function transform(targets, duration) {
    TWEEN.removeAll();
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        var target = targets[i];
        new TWEEN.Tween(object.position).to({
            x: target.position.x,
            y: target.position.y,
            z: target.position.z
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();
        new TWEEN.Tween(object.rotation).to({
            x: target.rotation.x,
            y: target.rotation.y,
            z: target.rotation.z
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start()
    }
    new TWEEN.Tween(this).to({}, duration * 2).onUpdate(render).start()
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render()
}
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
    juli = Math.sqrt(camera.position.z * camera.position.z + camera.position.y * camera.position.y + camera.position.x * camera.position.x);
    if (juli != juli2) {
        var vector2 = new THREE.Vector3;
        if (juli < 900) {
            for (var i = 0, l = objects.length; i < l; i++) {
                var object = new THREE.Object3D;
                object = objects[i];
                vector2.x = object.position.x * .5;
                vector2.y = object.position.y;
                vector2.z = object.position.z * .5;
                object.lookAt(vector2)
            }
        } else {
            for (var i = 0, l = objects.length; i < l; i++) {
                var object = new THREE.Object3D;
                object = objects[i];
                vector2.x = object.position.x * 2;
                vector2.y = object.position.y;
                vector2.z = object.position.z * 2;
                object.lookAt(vector2)
            }
        }
    }
    juli2 = juli
}
function render() {
    renderer.render(scene, camera)
}
var vcodetoid;
var mywordlist = new Array("");
var myShowMenu = true;
var MyResizing = false;
var MyResizingId = 0;
$.extend({
    initPageEvent: function() {
        $("#mylogoshowbtn").click(function() {
            if (myShowMenu) {
                myShowMenu = false;
                $("#mymenu").hide()
            } else {
                myShowMenu = true;
                $("#mymenu").show()
            }
            $.cookie("miaoxiaoercom_myShowMenu", myShowMenu)
        })
    },
    rnd: function(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
    },
    rndcolor: function() {
        return "rgba(" + $.rnd(0, 255) + "," + $.rnd(0, 255) + "," + $.rnd(0, 255) + ",1)"
    },
    CreatBackground: function() {
        var mycanvas = document.getElementById("mycanvas");
        mycanvas.width = $(window).width();
        mycanvas.height = $(window).height();
        if (mycanvas.getContext) {
            var ivwlw = $.rnd(1e3, 1e4);
            if (mycanvas.width < 800) {
                ivwlw = $.rnd(500, 4e3)
            }
            var ivcfee = $.rnd(1, 20);
            var ivcfed = $.rnd(1, 10);
            var ivcfef = $.rnd(1, 5);
            var cxt = mycanvas.getContext("2d");
            cxt.fillStyle = "#f7f7f7";
            cxt.fillRect(0, 0, mycanvas.width, mycanvas.height);
            cxt.lineWidth = $.rnd(1, ivwlw) / 10;
            cxt.lineCap = "round";
            var ix = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
            var iy = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
            var ix1 = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
            var iy1 = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
            var ix2 = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
            var iy2 = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
            var ix3 = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
            var iy3 = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
            if (mycanvas.width < mycanvas.height) {
                ix = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                iy = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                ix1 = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                iy1 = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                ix2 = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                iy2 = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                ix3 = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                iy3 = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
            }
            var icw = $.rnd(1, 30);
            if (Math.random() > .5) {
                for (var k = 0; k < ivcfed; k++) {
                    icw = $.rnd(1, 1e3) / 10;
                    ix = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    iy = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    if (mycanvas.width < mycanvas.height) {
                        ix = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                        iy = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
                    }
                    cxt.beginPath();
                    cxt.arc(ix, iy, icw, 0, Math.PI * 2, true);
                    cxt.closePath();
                    if (Math.random() > .9) {
                        cxt.fillStyle = $.rndcolor()
                    }
                    cxt.fill()
                }
            }
            cxt.strokeStyle = $.rndcolor();
            cxt.beginPath();
            cxt.moveTo(ix, iy);
            cxt.bezierCurveTo(ix1, iy1, ix2, iy2, ix3, iy3);
            cxt.stroke();
            for (var i = 0; i < ivcfef; i++) {
                if (ivwlw < 500) {
                    if (Math.random() > .6) {
                        ivwlw = ivwlw / $.rnd(5, 20) * $.rnd(1, 5)
                    } else {
                        ivwlw = ivwlw / $.rnd(5, 12) * $.rnd(3, 4)
                    }
                } else {
                    ivwlw = ivwlw / $.rnd(5, 20) * $.rnd(1, 5)
                }
                if (ivwlw < 1) ivwlw = 1;
                cxt.lineWidth = $.rnd(1, ivwlw) / 10;
                if (Math.random() > .5) {
                    cxt.moveTo($.rnd(0 - mycanvas.width, mycanvas.width * 2), $.rnd(0 - mycanvas.height, mycanvas.height * 2))
                }
                if (mycanvas.width > mycanvas.height) {
                    ix = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    iy = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    ix1 = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    iy1 = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    ix2 = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    iy2 = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    ix3 = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                    iy3 = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
                } else {
                    ix = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    iy = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    ix1 = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    iy1 = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    ix2 = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    iy2 = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                    ix3 = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    iy3 = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
                }
                if (Math.random() > .6) {
                    cxt.strokeStyle = $.rndcolor()
                }
                cxt.beginPath();
                cxt.moveTo(ix, iy);
                cxt.bezierCurveTo(ix1, iy1, ix2, iy2, ix3, iy3);
                cxt.stroke();
                icw = cxt.lineWidth + 1;
                ix = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                iy = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                cxt.beginPath();
                cxt.arc(ix, iy, icw, 0, Math.PI * 2, true);
                cxt.closePath();
                cxt.fill()
            }
            for (var j = 0; j < ivcfee; j++) {
                icw = $.rnd(1, 100) / 10;
                ix = $.rnd(0 - mycanvas.width, mycanvas.width * 2);
                iy = $.rnd(0 - mycanvas.height, mycanvas.height * 2);
                if (mycanvas.width < mycanvas.height) {
                    ix = $.rnd(0 - mycanvas.width - mycanvas.width, mycanvas.width * 4);
                    iy = $.rnd(0 - mycanvas.height, mycanvas.height * 2)
                }
                cxt.beginPath();
                cxt.arc(ix, iy, icw, 0, Math.PI * 2, true);
                cxt.closePath();
                if (Math.random() > .6) {
                    cxt.fillStyle = $.rndcolor()
                }
                cxt.fill()
            }
        }
    },
    MyResize: function() {
        clearTimeout(MyResizingId);
        MyResizingId = setTimeout("$.MyPageLayoutInit()", 200)
    },
    MyPageLayoutInit: function() {
        if (MyResizing == false) {
            MyResizing = true;
            $.CreatBackground();
            MyResizing = false
        }
    }
});
$(function() {
    var myParallaxBarrierEffectStr = $.cookie("miaoxiaoercom_myParallaxBarrierEffect");
    if (typeof myParallaxBarrierEffectStr == "string") {
        if (myParallaxBarrierEffectStr.toLowerCase() == "true") {
            myParallaxBarrierEffect = true
        } else {
            myParallaxBarrierEffect = false
        }
    }
    var myShowMenuStr = $.cookie("miaoxiaoercom_myShowMenu");
    if (typeof myShowMenuStr == "string") {
        if (myShowMenuStr.toLowerCase() == "true") {
            myShowMenu = true;
            $("#mymenu").show()
        } else {
            myShowMenu = false;
            $("#mymenu").hide()
        }
    } else {
        myShowMenu = true;
        $.cookie("miaoxiaoercom_myShowMenu", myShowMenu);
        $("#mymenu").show()
    }
    $.initPageEvent();
    $.MyPageLayoutInit();
    $(window).resize(function() {
        $.MyResize()
    });
    if (!IsPC()) {
        myspeedhuadong = 1
        $("#mymenu").css("top","45px");
        $("#mymenu2").css("right","20px");
        $("#mymenu").children("li").css("height","40px");
        $(".my_svg").each(function(){
            $(this).attr("src", $(this).attr("data")+"_32.svg");
        })
        $("#mylogoshowbtn").click();
    } else {
        $(".my_svg").each(function(){
            $(this).attr("src", $(this).attr("data")+"_64.svg");
        });
        if (getBrowser() == "ie") {
            myspeedhuadong = 3
        } else {
            myspeedhuadong = 3
        }
    }
    init();
    animate()
});