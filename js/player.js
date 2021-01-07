define(["module", "jquery"], function(e, t) {
    function o(e) {
        t.extend(u, e),
        d = u.playerId,
        p = u.courseId,
        f = u.ccSiteId,
        h = u.isTrial === !0 || "true" === u.isTrial ? "true" : "false",
        v = u.playerDiv,
        k = u.isEditQuestion ? u.isEditQuestion : k,
        m = u.trialTime ? u.trialTime : m,
        g = u.restTime ? u.restTime : g,
        r = u.playerInitCallbak,
        c = u.playEndCallbak,
        l = u.record,
        (window.ActiveXObject || "ActiveXObject"in window) && (C = !0),
        u.useFlash && (C = u.useFlash),
        l && l.init(),
        C === !0 ? (console.log("define flash"),
        T()) : (console.log("define h5"),
        j())
    }
    function n(e) {
        return window.document[e] ? window.document[e] : -1 != navigator.appName.indexOf("Microsoft") ? document.getElementById(e) : document.embeds && document.embeds[e] ? document.embeds[e] : void 0
    }
    function a() {
        console.log(">>>clear playerTimer"),
        clearInterval(w)
    }
    function s() {
        return null == I ? (console.log("currentPlayCoursecontentId is null"),
        void 0) : y[I] ? (console.log("testTime has load courseQueTime[" + I + "]=" + JSON.stringify(y[I])),
        void 0) : (t.ajax({
            url: "course.do?action=getTestDuringCourse",
            data: {
                id: I
            },
            dataType: "json"
        }).done(function(e) {
            e.success ? y[I] = e.result && e.result.list && e.result.list.length > 0 ? e.result.list : [] : x(e.message)
        }),
        void 0)
    }
    var l, r, c, d, u = e.config(), p = 0, v = "", f = "", h = "false", m = 180, g = 1200, y = [], w = null, b = 0, I = null, C = !1, k = !1, x = function(e) {
        t.dialog({
            boxid: "message_tip",
            title: "提示",
            width: 280,
            content: '<span style="display:block;text-align: center;">' + (e ? e : "额，出错啦~~") + "</span>",
            buttons: [{
                text: "确定",
                css: {
                    backgroundColor: "#c0130d"
                }
            }]
        })
    }, _ = function(e) {
        var i = t.dialog({
            boxid: "rest_tip",
            title: "提示",
            width: 380,
            modal: !0,
            content: '<span style="display:block;text-align: center;">' + e + "</span>",
            buttons: [{
                text: "继续学习",
                css: {
                    backgroundColor: "#c0130d"
                },
                click: function() {
                    window.playerPlay(),
                    i.close()
                }
            }]
        })
    }, T = function() {
        window.getParamsForCCplayer = function() {
            var e = BASE_PATH.substring(7, BASE_PATH.length - 1);
            0 == BASE_PATH.indexOf("https") && (e = BASE_PATH.substring(8, BASE_PATH.length - 5));
            var t = {
                coursecontentId: I,
                courseId: p,
                isTrial: "true" === h,
                trialTime: m,
                domain: e,
                restTime: g,
                isEditQuestion: k
            };
            return t
        }
        ,
        window.on_cc_player_init = function() {
            r && "function" == typeof r && r()
        }
        ,
        window.on_spark_player_stop = function() {
            l && l.videoPlayEnd && l.videoPlayEnd(),
            c && "function" == typeof c && c()
        }
        ,
        window.on_spark_player_start = function() {
            console.log(">>>on_spark_player_start"),
            l && l.courseRecord && l.courseRecord()
        }
        ,
        window.on_spark_player_pause = function() {
            console.log(">>>on_spark_player_pause"),
            l && l.clearRecordTimer && l.clearRecordTimer()
        }
        ,
        window.on_spark_player_resume = function() {
            console.log(">>>on_spark_player_resume"),
            l && l.courseRecord && l.courseRecord()
        }
        ,
        window.playerPause = function() {
            window.videoObj.pause()
        }
        ,
        window.playerPlay = function() {
            window.videoObj.resume()
        }
        ,
        window.getPosition = function() {
            return window.videoObj.getPosition()
        }
        ,
        window.normalScreen = function() {
            window.videoObj.normalScreen()
        }
    }, j = function() {
        window.on_CCH5player_ready = function() {
            console.log("on_CCH5player_ready"),
            r && "function" == typeof r && r(),
            s(),
            q()
        }
        ,
        window.on_CCH5player_ended = function() {
            console.log("on_CCH5player_ended"),
            l && l.videoPlayEnd && l.videoPlayEnd(),
            c && "function" == typeof c && c()
        }
        ,
        window.on_CCH5player_play = function() {
            console.log(">>>on_CCH5player_play"),
            l && l.courseRecord && l.courseRecord(),
            q()
        }
        ,
        window.on_CCH5player_pause = function() {
            console.log(">>>on_CCH5player_pause"),
            l && l.clearRecordTimer && l.clearRecordTimer(),
            a()
        }
        ,
        window.playerPause = function() {
            window.cc_js_Player.pause()
        }
        ,
        window.playerPlay = function() {
            window.cc_js_Player.play()
        }
        ,
        window.getPosition = function() {
            return window.cc_js_Player.getPosition()
        }
        ,
        window.jumpToTime = function(e) {
            return console.log(">>>jumpToTime=" + e),
            window.cc_js_Player.jumpToTime(e)
        }
        ,
        window.normalScreen = function() {
            window.cc_js_Player.normalScreen()
        }
    }, P = function(e, i) {
        var o = "";
        I = e,
        C === !0 ? (console.log("load flash"),
        o = ' <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="100%" height="100%" id="' + v + '_api">' + '<param name="movie" value="https://p.bokecc.com/flash/player.swf?vid=' + i + "&amp;siteid=" + f + "&amp;playerid=" + d + '&amp;playertype=1&amp;autoStart=true">' + '<param value="transparent" name="wmode">' + '<param name="allowFullScreen" value="true">' + '<param name="allowScriptAccess" value="always">' + '<embed src="https://p.bokecc.com/flash/player.swf?vid=' + i + "&amp;siteid=" + f + "&amp;playerid=" + d + '&amp;playertype=1&amp;autoStart=true" width="100%" height="100%" name="' + v + '_api" wmode="transparent" allowfullscreen="true" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">' + "</object>",
        t("#" + v).html(o),
        window.videoObj = n(v + "_api")) : (console.log("load h5"),
        console.log("load h5 vid=" + i + " siteid= " + f),
        b = 0,
        window.cc_js_Player = createCCH5Player({
            vid: i,
            siteid: f,
            playtype: 1,
            autoStart: "true",
            width: "100%",
            height: "100%",

            rate_allow_change: "false",
            banDrag: h,
            parentNode: "#" + v
        }))
    }, q = function() {
        w && a()
    };
    return {
        init: o,
        loadPlayer: P,
        clearPlayerTimer: a,
        useFlash: function() {
            return C
        }
    }
});
