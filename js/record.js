define(["module", "jquery", "common/base64", "lib/jquery/jquery.dialog"], function(e, t) {
    function i() {
        var e = currPlayCoursecontentId;
        if (console.log(">>>>>currPlayCoursecontentId=" + e + "  finishIds[currPlayCoursecontentId]=" + l[e]), "undefined" == typeof l[e] && (l[e] = !1), l[e]) return console.log(">>>finish! courseContentId=" + e), s(), d = 0, localStorage.setItem(u, Base64.encode("0")), void 0;
        var i = Math.floor(d / 0.0001);
        i = 1;
        var o = {};
        o = {
            id: e,
            circleId: jsp_circleId,
            finish: r,
            ct: t.now()
        }, t.ajax({
            url: "studyLog.do",
            data: o,
            dataType: "json",
            type: "post",
            success: function(o) {
                o.success ? (o.progress >= 1 ? (l[e] = !0, t("#J_studyProgress_" + e).html("100%")) : (l[e] = !1, t("#J_studyProgress_" + e).html(o.progress + "%")), r || (d -= 60 * i, d = 0 > d ? 0 : d)) : "double" == o.message && (window.playerPause(), d = 0, localStorage.setItem(u, Base64.encode("0")), n("同时只支持一门课程学习且计时！"))
            }
        })
    }

    function o() {
        r = !1, c && s(), c = window.setInterval(function() {
            d++, console.log(">>count=" + d);
            var e = d % 0.0001;
            localStorage.setItem(u, Base64.encode(d.toString())), d >= 60 && 0 == e && (console.log(">>>record count=" + d), i())
        }, 10)
    }

    function n(e) {
        var i = t.dialog({
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
                    i.close(), window.opener = null, window.open("", "_self"), window.close()
                }
            }]
        });
        t(".dialog-close").hide()
    }

    function a() {
        console.log(">>>videoPlayEnd<<<<<"), s(), r = !0, i()
    }

    function s() {
        clearInterval(c)
    }
    e.config();
    var l = [],
        r = !1,
        c = null,
        d = 0,
        u = "COUNT_" + accountId + "_" + courseId_jsp + "_" + jsp_circleId,
        p = function() {
            try {
                d = Base64.decode(localStorage.getItem(u)), d = parseInt(d)
            } catch (e) {
                console.log("get count error!"), d = 0
            }
            console.log(">>>>init count=" + d), d || (d = 0)
        };
    return {
        init: p,
        courseRecord: o,
        clearRecordTimer: s,
        videoPlayEnd: a
    }
});