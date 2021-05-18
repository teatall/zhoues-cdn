/*! ablejs - v0.2.0 - Tuesday, April 13th, 2021, 7:23:49 PM
 * http://www.ablesky.com
 * Copyright (c) 2021 frontend@ablesky.com; Licensed  */
define(["module", "jquery"], function(e, t) {
  function a(e) {
    t.extend(u, e), c = u.playerId, p = u.courseId, h = u.ccSiteId, g = u.isTrial === !0 || "true" === u.isTrial ? "true" : "false", m = u.playerDiv, _ = u.isEditQuestion ? u.isEditQuestion : _, f = u.trialTime ? u.trialTime : f, v = u.restTime ? u.restTime : v, l = u.playerInitCallbak, d = u.playEndCallbak, r = u.record, (window.ActiveXObject || "ActiveXObject" in window) && (k = !0), u.useFlash && (k = u.useFlash), r && r.init(), k === !0 ? (console.log("define flash"), E()) : (console.log("define h5"), I())
  }

  function n(e) {
    return window.document[e] ? window.document[e] : -1 != navigator.appName.indexOf("Microsoft") ? document.getElementById(e) : document.embeds && document.embeds[e] ? document.embeds[e] : void 0
  }

  function o() {
    console.log(">>>clear playerTimer"), clearInterval(b)
  }

  function s() {
    return null == w ? (console.log("currentPlayCoursecontentId is null"), void 0) : y[w] ? (console.log("testTime has load courseQueTime[" + w + "]=" + JSON.stringify(y[w])), void 0) : (t.ajax({
      url: "course.do?action=getTestDuringCourse",
      data: {
        id: w
      },
      dataType: "json"
    }).done(function(e) {
      e.success ? y[w] = e.result && e.result.list && e.result.list.length > 0 ? e.result.list : [] : C(e.message)
    }), void 0)
  }
  var r, l, d, c, u = e.config(),
    p = 0,
    m = "",
    h = "",
    g = "false",
    f = 180,
    v = 1200,
    y = [],
    b = null,
    x = 0,
    w = null,
    k = !1,
    _ = !1,
    C = function(e) {
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
    },
    T = function(e) {
      var a = t.dialog({
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
            window.playerPlay(), a.close()
          }
        }]
      })
    },
    E = function() {
      window.getParamsForCCplayer = function() {
        var e = BASE_PATH.substring(7, BASE_PATH.length - 1);
        0 == BASE_PATH.indexOf("https") && (e = BASE_PATH.substring(8, BASE_PATH.length - 5));
        var t = {
          coursecontentId: w,
          courseId: p,
          isTrial: "true" === g,
          trialTime: f,
          domain: e,
          restTime: v,
          isEditQuestion: _
        };
        return t
      }, window.on_cc_player_init = function() {
        l && "function" == typeof l && l()
      }, window.on_spark_player_stop = function() {
        r && r.videoPlayEnd && r.videoPlayEnd(), d && "function" == typeof d && d()
      }, window.on_spark_player_start = function() {
        console.log(">>>on_spark_player_start"), r && r.courseRecord && r.courseRecord()
      }, window.on_spark_player_pause = function() {
        console.log(">>>on_spark_player_pause"), r && r.clearRecordTimer && r.clearRecordTimer()
      }, window.on_spark_player_resume = function() {
        console.log(">>>on_spark_player_resume"), r && r.courseRecord && r.courseRecord()
      }, window.playerPause = function() {
        window.videoObj.pause()
      }, window.playerPlay = function() {
        window.videoObj.resume()
      }, window.getPosition = function() {
        return window.videoObj.getPosition()
      }, window.normalScreen = function() {
        window.videoObj.normalScreen()
      }
    },
    I = function() {
      window.on_CCH5player_ready = function() {
        console.log("on_CCH5player_ready"), l && "function" == typeof l && l(), s(), A()
      }, window.on_CCH5player_ended = function() {
        console.log("on_CCH5player_ended"), r && r.videoPlayEnd && r.videoPlayEnd(), d && "function" == typeof d && d()
      }, window.on_CCH5player_play = function() {
        console.log(">>>on_CCH5player_play"), r && r.courseRecord && r.courseRecord(), A()
      }, window.on_CCH5player_pause = function() {
        console.log(">>>on_CCH5player_pause"), r && r.clearRecordTimer && r.clearRecordTimer(), o()
      }, window.playerPause = function() {
        window.cc_js_Player.pause()
      }, window.playerPlay = function() {
        window.cc_js_Player.play()
      }, window.getPosition = function() {
        return window.cc_js_Player.getPosition()
      }, window.jumpToTime = function(e) {
        return console.log(">>>jumpToTime=" + e), window.cc_js_Player.jumpToTime(e)
      }, window.normalScreen = function() {
        window.cc_js_Player.normalScreen()
      }
    },
    S = function(e, a, i) {
      var o = "";
      w = e, k === !0 ? (console.log("load flash"), o = ' <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="100%" height="100%" id="' + m + '_api">' + '<param name="movie" value="https://p.bokecc.com/flash/player.swf?vid=' + a + "&amp;siteid=" + i + "&amp;playerid=" + c + '&amp;playertype=1&amp;autoStart=true">' + '<param value="transparent" name="wmode">' + '<param name="allowFullScreen" value="true">' + '<param name="allowScriptAccess" value="always">' + '<embed src="https://p.bokecc.com/flash/player.swf?vid=' + a + "&amp;siteid=" + i + "&amp;playerid=" + c + '&amp;playertype=1&amp;autoStart=true" width="100%" height="100%" name="' + m + '_api" wmode="transparent" allowfullscreen="true" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">' + "</object>", t("#" + m).html(o), window.videoObj = n(m + "_api")) : (console.log("load h5"), console.log("load h5 vid=" + a + " siteid= " + i), x = 0, window.cc_js_Player = createCCH5Player({
        vid: a,
        siteid: i,
        playtype: 1,
        autoStart: "true",
        width: "100%",
        height: "100%",
        rate_allow_change: "false",
        banDrag: g,
        parentNode: "#" + m
      }))
    },
    A = function() {
      b && o(), b = window.setInterval(function() {
        x++;
        var e = Math.round(window.getPosition());
        0 == x % 30 && console.log(">>playCount=" + x + " curPlayTime=" + e);
        var t = y[w],
          a = !1;
        if (t && t.length > 0)
          for (i = 0; i < t.length; i++) t[i].timeSlot == e && (a = !0, window.veiwExamStart(t[i].id, t[i].timeSlot));
      }, 1e3)
    };
  return {
    init: a,
    loadPlayer: S,
    clearPlayerTimer: o,
    useFlash: function() {
      return k
    }
  }
});
