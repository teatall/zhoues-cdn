/*! ablejs - v0.2.0 - Tuesday, April 13th, 2021, 7:23:49 PM
 * http://www.ablesky.com
 * Copyright (c) 2021 frontend@ablesky.com; Licensed  */
define(["module", "jquery", "common/base64", "lib/jquery/jquery.dialog"], function(e, t) {
  function a() {
    var e = currPlayCoursecontentId;
  }

  function i() {
    l = !1, d && s(), d = window.setInterval(function() {
      c++, console.log(">>count=" + c);
      var e = c % 60;
      localStorage.setItem(u, Base64.encode(c.toString())), c >= 60 && 0 == e && (console.log(">>>record count=" + c), a())
    }, 1)
  }

  function n(e) {
    var a = t.dialog({
      boxid: "showMessage_boxid",
      title: "提示",
      headStyle: {
        backgroundColor: "#c0130d"
      },
      bodyStyle: {
        backgroundColor: "#F7F7F7"
      },
      footStyle: {
        backgroundColor: "#F7F7F7"
      },
      content: "<center>" + e + "</center>",
      modal: !0,
      width: 370,
      buttons: [{
        text: "知道了",
        css: {
          backgroundColor: "#c0130d"
        },
        click: function() {
          a.close(), window.opener = null, window.open("", "_self"), window.close()
        }
      }]
    });
    t(".dialog-close").hide()
  }

  function o() {
    console.log(">>>videoPlayEnd<<<<<"), s(), l = !0, a()
  }

  function s() {
    clearInterval(d)
  }
  e.config();
  var r = [],
    l = !1,
    d = null,
    c = 0,
    u = "COUNT_" + accountId + "_" + courseId_jsp + "_" + jsp_circleId,
    p = function() {
      try {
        c = Base64.decode(localStorage.getItem(u)), c = parseInt(c)
      } catch (e) {
        console.log("get count error!"), c = 0
      }
      console.log(">>>>init count=" + c), c || (c = 0)
    };
  return {
    init: p,
    courseRecord: i,
    clearRecordTimer: s,
    videoPlayEnd: o
  }
});
