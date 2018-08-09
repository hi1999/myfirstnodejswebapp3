'use strict'
var express = require('express');
var app = express();

var ua = require('universal-analytics');
var visitor = ua('UA-21856187-7');//谷歌统计

app.get("/", function (req, res) {
    res.send('Hello World!')
});

app.get("/test", function (req, res) {
    visitor.pageview("/somepage", "测试页面", "https://luolei.org").send();
    visitor.event("事件类别", "事件行为", "事件标签", 42).send();
    res.redirect("http://tw.yahoo.com");
});

//app.listen(3000);

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});