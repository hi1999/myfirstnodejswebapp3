var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1582182960',
    channelSecret: 'c704241b69cade92ab8798ad5c3b3e5b',
    channelAccessToken: 'LT+LkDLR3McBFEiVtGJcLx4VFF7bLqC8/VtmZk/2rfcQEze6mIIyPq3Xg2g2I1poURhGfv1fCxAY4uD5t5dkzhNP+BbXiseCTm9Zprtc1MZITPN1Rvo9021XUZ590fPE+hg7+wTiq5ruhW2s5aCHRwdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
   if(event=="message"){
        if(event.message.text=="抽"){
            console.log(event); //把收到訊息的 event 印出來看看
            event.reply("圖片").then(function(data){
                console.log('success',data);
                }).catch(function(error){ console.log('Error',error);
            });
        }else{
            console.log(event); //把收到訊息的 event 印出來看看
            event.reply(event.message.text).then(function(data){
                console.log('success',data);
                }).catch(function(error){ console.log('Error',error);
            });
        }
    }
       if(event=="message" && event.message.text=="Carousel Template"){
       
var column1 = new LINEBot.CarouselColumnTemplateBuilder();
column1.setTitle('this is item 1')
       .setMessage('description')
       .setThumbnail('https://example.com/bot/images/item1.jpg')
       .addAction('Buy', 'action=buy&itemid=111', LINEBot.Action.POSTBACK)
       .addAction('Add to cart', 'action=buy&itemid=111', LINEBot.Action.POSTBACK)
       .addAction('View detail', 'http://example.com/page/111', LINEBot.Action.URI);
 
var column2 = new LINEBot.CarouselColumnTemplateBuilder();
column2.setTitle('this is item 2')
       .setMessage('description')
       .setThumbnail('https://example.com/bot/images/item2.jpg')
       .addAction('Buy', 'action=buy&itemid=222', LINEBot.Action.POSTBACK)
       .addAction('Add to cart', 'action=buy&itemid=222', LINEBot.Action.POSTBACK)
       .addAction('View detail', 'http://example.com/page/222', LINEBot.Action.URI);
 
var carousel = new LINEBot.CarouselTemplateBuilder([column1, column2]);

    }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
