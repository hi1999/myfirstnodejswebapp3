var express = require("express");
var myParser = require("body-parser");

console.log('start index2.js'); 

var bot = linebot({
    channelId: '1574577182',
    channelSecret: '3e03bec3a3ee9e463ed76dfe7da3baec',
    channelAccessToken: 'NZXzzQ3o+VJYjHusBszu5QIoff22qIQ88z+F0fOFeFKIYsLtuYPB4XJAGY84LJIBJpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z77Sdumg1Hom12AXpa827FVnCoR81vbtvGoDlHCrX5MdmwdB04t89/1O/w1cDnyilFU='
});


bot.on('message', function (event) {
    //把收到訊息的 event 印出來看看
    console.log('解析收到的event:'); console.log(event); 
    console.log('┌──(參數解析)───────────────');
    //console.log('│event type', event.type);
    console.log('│message', event.message);
    console.log('│userId', event.source.userId);
    console.log('│groupId', event.source.groupId);
    console.log('│replyToken', event.source.replyToken);
    console.log('└──(參數解析)───────────────');

});


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});