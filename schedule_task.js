
console.log('=====測試排程=====');
console.log(Date.now());


//Line主動推播測試
var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1574577182',
    channelSecret: '',
    channelAccessToken: ''
});

const ME = 'Ubb9f5c58d8fc3755bc871dcda17439f6';//'U39df481b54d0db051fe29d3a94b5b887';
bot.push(ME, {
    type: 'text',
    text: '女王呼喚：\n\n快去洗鳥！！'
});
//const SAM = 'Uf11e08fe2c7bbabff46ad97b52806f3a';//'U96297178ee6ec3fbfe6d399b5b1e92e7';
//bot.push(SAM, {
//    type: 'text',
//    text: '讚讚讚！！'
//});

//Mark at 0529------------------------------------------------------------
/*console.log('取得相簿裡的所有照片');
var request = require('request');
var options = {
    url: 'https://api.imgur.com/3/album/ZaDbl2w/images',
    headers: { 'Authorization': 'Client-ID c5059e019ff8903' }
};
var i = 0;
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        for (i = 0; i < info.data.length; i++) {
            console.log('取得相簿照片-',info.data[i].link);
        }
    }
}
request(options, callback);
*/

//------------------------------------------------------------
//console.log('資料庫測試');
//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://admin:tartan@ds235840.mlab.com:35840/heroku_p97hnb3x';

////Insert Sample
//MongoClient.connect(url, function (err, database) {
//    console.log('DB連線成功');
//    var db = database.db('heroku_p97hnb3x');
//    db.collection('test1').insertOne({
//        age: 40,
//        name: "Sam"
//    });
//    database.close();
//    console.log('DB插入資料成功');
//});

//// Find Data Sample
//MongoClient.connect(url, function (err, database) {
//    console.log('DB連線成功');
//    var db = database.db('heroku_p97hnb3x');
//    var cursor = db.collection('test1').find();

//    //For each
//    cursor.each(function (err, doc) {
//        console.log('DB資料讀取:', doc);
//    });
//    database.close();
//}); 

//// Update Data Sample
//MongoClient.connect(url, function (err, database) {
//    console.log('DB連線成功');
//    var db = database.db('heroku_p97hnb3x');
//    db.collection('test1').updateOne(
//        { "name": "Sam" },        //==>Where條件
//        //{ $set: { "age": 41 } }   //==>Set Value範例
//        { $inc: { age: 1 } }      //==> +1 的範例
//    );
//    console.log('DB更新資料成功:');
//    database.close();
//}); 

console.log('==================');
