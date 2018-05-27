var linebot = require('linebot');
var express = require('express');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
    var xlsx = require('node-xlsx');

var bot = linebot({
    channelId: '1574577182',
    channelSecret: 'c05559be60a96b1c97ec1e23e66dfe34',
    channelAccessToken: 'IuH6YSRirA0lKr2RRbRXaXCr0ysuVmaNpPBi8VLh0nLj7hOOIexln58+JAswGF71Jpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z74JdtfRJe4IizHpQ9k5QmqLTNIRUvV+8YRKnkkYLJiH7AdB04t89/1O/w1cDnyilFU='
});


console.log('資料庫測試');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://admin:tartan@ds235840.mlab.com:35840/heroku_p97hnb3x';

//Insert Sample
MongoClient.connect(url, function (err, database) {
    console.log('DB連線成功');
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
    console.log('DB連線成功');
    var db = database.db('heroku_p97hnb3x');
    var cursor = db.collection('test1').find();
    cursor.each(function (err, doc) {
        console.log('DB資料讀取:', doc);
    });
    database.close();
});

// Update Data Sample
MongoClient.connect(url, function (err, database) {
    console.log('DB連線成功');
    var db = database.db('heroku_p97hnb3x');
    db.collection('Employee').updateOne(
        { "name": "Sam" },        //==>Where條件
        //{ $set: { "age": 41 } }   //==>Set Value範例
        { $inc: { age: 1 } }      //==> +1 的範例
    );
    console.log('DB更新資料成功:');
    database.close();
}); 

bot.on('message', function (event) {

    //把收到訊息的 event 印出來看看
    console.log('收到的event:');
    console.log(event); 




var fs = require('fs');

var data = [
    {
        name : 'sheet1',
        data : [
            [
                'ID',
                'Name',
                'Score'
            ],
            [
                '1',
                'Michael',
                '99'

            ],
            [
                '2',
                'Jordan',
                '98'
            ]
        ]
    },
    {
        name : 'sheet2',
        data : [
            [
                'AA',
                'BB'
            ],
            [
                '23',
                '24'
            ]
        ]
    }
]

// 寫xlsx
//var buffer = xlsx.build(data);
//fs.writeFile('./hi1999/myfirstnodejswebapp3/resut.xls', buffer, function (err)
//{
//   // if (err)
//   //     throw err;
//    console.log('Write to xls has finished');
    
//// 讀xlsx
//    var obj = xlsx.parse("./hi1999/myfirstnodejswebapp3/" + "resut.xls");
//    console.log(JSON.stringify(obj));
//}
//);
    
	
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
    //"type": "file",
    //"fileName": "file.txt",
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
    
   

    //===========================================================
    //測試連結Google試算表功能
    console.log('##測試==>連結Google試算表');
    //var GoogleSpreadsheet = require('google-spreadsheet');
    //console.log("連Google");
    //var creds = require('./client_secret.json');    console.log("creds:" + creds);
    //var doc = new GoogleSpreadsheet('1GjY1OKGyO_QMLTk4G10J_cCpb_rAbKXcMs8Q2aLrHEo');    console.log("doc:" + doc);
    //var creds_json = {
    //  client_email: 'pchunfan@google.com',
    //  private_key: 'n1dRke7L5V5dtUK4J23lXTGC'
    //}
    //console.log("creds_json:" + creds_json);

    //doc.useServiceAccountAuth(creds, step);
    //sheet = info.worksheets[0];
    //console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount)
    
    //===========================================================

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
