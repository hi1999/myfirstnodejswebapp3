var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1582182960',
    channelSecret: 'c704241b69cade92ab8798ad5c3b3e5b',
    channelAccessToken: 'LT+LkDLR3McBFEiVtGJcLx4VFF7bLqC8/VtmZk/2rfcQEze6mIIyPq3Xg2g2I1poURhGfv1fCxAY4uD5t5dkzhNP+BbXiseCTm9Zprtc1MZITPN1Rvo9021XUZ590fPE+hg7+wTiq5ruhW2s5aCHRwdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
   /* console.log(event); //把收到訊息的 event 印出來看看
    
    
    //////回覆訊息功能-測試OK
   
   event.reply("圖片").then(function(data){
                console.log('success',data);
    }).catch(function(error){ console.log('Error',error);
 });
 */
    
    //
    
    
    //////回覆Comfirm Template功能-測試OK
    
   /* 
    event.reply({
  type: 'template',
  altText: 'this is a confirm template',
  template: {
    type: 'confirm',
    text: 'Are you sure?',
    actions: [{
      type: 'message',
      label: 'Yes',
      text: 'yes'
    }, {
      type: 'message',
      label: 'No',
      text: 'no'
    }]
  }
});
    */
    //////測試連結Google試算表功能
    
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
console.log("連Google");
var creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet('1GjY1OKGyO_QMLTk4G10J_cCpb_rAbKXcMs8Q2aLrHEo');
async.series([
  function setAuth(step) {
    // see notes below for authentication instructions!
    var creds = require('./client_secret.json');
    // OR, if you cannot save the file locally (like on heroku)
    var creds_json = {
      client_email: 'pchunfan@google.com',
      private_key: 'n1dRke7L5V5dtUK4J23lXTGC'
    }
 
    doc.useServiceAccountAuth(creds, step);
  },
 sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount)
    
    //////Line主動推播測試
    /*const ME = 'U39df481b54d0db051fe29d3a94b5b887';
    			bot.push(ME, {
				type: 'text',
				text: '女王呼喚：\n\n快去洗碗！！'
			});
*/


});
    
    const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
