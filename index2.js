var linebot = require('linebot');
var express = require('express');

console.log('start index2.js'); 

var bot = linebot({
    channelId: '1574577182',
    channelSecret: '3e03bec3a3ee9e463ed76dfe7da3baec',
    channelAccessToken: 'NZXzzQ3o+VJYjHusBszu5QIoff22qIQ88z+F0fOFeFKIYsLtuYPB4XJAGY84LJIBJpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z77Sdumg1Hom12AXpa827FVnCoR81vbtvGoDlHCrX5MdmwdB04t89/1O/w1cDnyilFU='
});


bot.on('message', function (event) {

    //把收到訊息的 event 印出來看看
    console.log('解析收到的event:');
    console.log(event);
    console.log('type==>', event.type);
    console.log('replyToken==>', event.replyToken);
    console.log('userId==>', event.source.userId);

    if (event.type === 'message') {
        console.log(event.type, event.message);
    } else if (event.type === 'follow') {
        console.log(event.type, '');
        console.log(event.source);
    }
});


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});