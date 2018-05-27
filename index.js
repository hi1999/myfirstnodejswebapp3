var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1574577182',
    channelSecret: '3e03bec3a3ee9e463ed76dfe7da3baec',
    channelAccessToken: 'NZXzzQ3o+VJYjHusBszu5QIoff22qIQ88z+F0fOFeFKIYsLtuYPB4XJAGY84LJIBJpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z77Sdumg1Hom12AXpa827FVnCoR81vbtvGoDlHCrX5MdmwdB04t89/1O/w1cDnyilFU=+JAswGF71Jpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z74JdtfRJe4IizHpQ9k5QmqLTNIRUvV+8YRKnkkYLJiH7AdB04t89/1O/w1cDnyilFU='
});

console.log('資料庫測試');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://admin:tartan@ds235840.mlab.com:35840/heroku_p97hnb3x';

//Insert Sample
MongoClient.connect(url, function (err, database) {
    console.log('DB連線成功1');
    var db = database.db('heroku_p97hnb3x');
    db.collection('test1').insertOne({
        age: 40,
        name: "Sam"
    });
    database.close();
    console.log('DB插入資料成功');
});

// Read Data Sample
MongoClient.connect(url, function (err, database) {
    console.log('DB連線成功2');
    var db = database.db('heroku_p97hnb3x');
    var cursor = db.collection('test1').find();
    cursor.each(function (err, doc) {
        console.log('DB資料讀取:', doc);
    });
    database.close();
});

// Update Data Sample
MongoClient.connect(url, function (err, database) {
    console.log('DB連線成功3');
    var db = database.db('heroku_p97hnb3x');
    db.collection('test1').updateOne(
        { "name": "Sam" },        //==>Where條件
        //{ $set: { "age": 41 } }   //==>Set Value範例
        { $inc: { age: 1 } }      //==> +1 的範例
    );
    console.log('DB更新資料成功');
    database.close();
}); 

bot.on('message', function (event) {

    //把收到訊息的 event 印出來看看
    console.log('收到的event:');
    console.log(event); 

    var msg = JSON.parse(event.postData.contents);
    var userId = msg.events[0].source.userId;
    var groupId = msg.events[0].source.groupId;

    console.log('-----(參數解析)-----');
    console.log('--msg',msg);
    console.log('--userId',userId);
    console.log('--groupId', groupId);
    console.log('-----(參數解析)-----');

    //===========================================================
    //回覆訊息功能-測試OK   
    //console.log('##測試==>回覆訊息功能');
    //event.reply("圖片").then(function (data) {
    //    console.log('success', data);
    //}).catch(function (error) {
    //    console.log('Error', error);
    //    });
    //console.log('##');
    //===========================================================

    //===========================================================
    //回覆Comfirm Template功能-測試OK
  /*  console.log('##測試==>回覆Comfirm Template功能');
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
    console.log('##');*/
    //===========================================================
    
   


});
    


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
