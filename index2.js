var linebot = require('linebot');
var express = require('express');

console.log('start index2.js'); 

var bot = linebot({
    channelId: '1574577182',
    channelSecret: '3e03bec3a3ee9e463ed76dfe7da3baec',
    channelAccessToken: 'NZXzzQ3o+VJYjHusBszu5QIoff22qIQ88z+F0fOFeFKIYsLtuYPB4XJAGY84LJIBJpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z77Sdumg1Hom12AXpa827FVnCoR81vbtvGoDlHCrX5MdmwdB04t89/1O/w1cDnyilFU='
});

//事件：加入好友
bot.on('follow', function (event) {
    console.log('==================follow');
});
bot.on('unfollow', function (event) {
    console.log('==================unfollow');
});
//事件：加入群組
bot.on('join', function (event) { 
    console.log('==================join');
});
//事件：退出群組
bot.on('leave', function (event) {
    console.log('==================leave');
});
bot.on('message', function (event) {

    //把收到訊息的 event 印出來看看
    console.log('==================');
    console.log('解析收到的event:');
    //console.log(event);
    console.log('type==>', event.type);
    console.log('replyToken==>', event.replyToken);
    console.log('userId==>', event.source.userId);
    console.log('==================');

    if (event.type === 'message') {
        console.log(event.type, event.message);
    } else if (event.type === 'follow') {
        console.log(event.type, '');
        console.log(event.source);
    }
    console.log('==================');
});


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});