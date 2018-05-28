var linebot = require('linebot');
var express = require('express');

console.log('start index2.js'); 

var bot = linebot({
    channelId: '1574577182',
    channelSecret: '3e03bec3a3ee9e463ed76dfe7da3baec',
    channelAccessToken: 'NZXzzQ3o+VJYjHusBszu5QIoff22qIQ88z+F0fOFeFKIYsLtuYPB4XJAGY84LJIBJpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z77Sdumg1Hom12AXpa827FVnCoR81vbtvGoDlHCrX5MdmwdB04t89/1O/w1cDnyilFU='
});

//使用者加入機器人好友事件
bot.on('follow', function (event) {
    console.log('==================follow-使用者加入機器人好友事件');
});
//使用者刪除機器人好友事件
bot.on('unfollow', function (event) {
    console.log('==================unfollow-使用者刪除機器人好友事件');
});
//機器人加入群組時的事件
bot.on('join', function (event) { 
    console.log('==================join-機器人加入群組時的事件');
});
//機器人離開群組時的事件
bot.on('leave', function (event) {
    console.log('==================leave-機器人離開群組時的事件');
});;
//使用者透過套版訊息回應時的事件
bot.on('postback', function (event) {
    console.log('==================postback-使用者透過套版訊息回應時的事件');
});
//訊息事件
bot.on('message', function (event) {
    console.log('==================message-訊息事件');

    //把收到訊息的 event 印出來看看
    console.log('解析收到的event:');
    //console.log(event);
    console.log('type==>', event.type);
    console.log('replyToken==>', event.replyToken);
    console.log('userId==>', event.source.userId);
    console.log('==================');

});
//mark at 0529 
/*const line = require('@line/bot-sdk');
const client = new line.Client({
    channelAccessToken: 'NZXzzQ3o+VJYjHusBszu5QIoff22qIQ88z+F0fOFeFKIYsLtuYPB4XJAGY84LJIBJpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z77Sdumg1Hom12AXpa827FVnCoR81vbtvGoDlHCrX5MdmwdB04t89/1O/w1cDnyilFU='
});
client.leaveGroup('<groupId>').then(() => {
    console.log('12345');
    })
    .catch((err) => {
        // error handling
    });
*/
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
