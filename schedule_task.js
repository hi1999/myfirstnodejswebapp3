
console.log('=====測試排程=====');
console.log(Date.now());


//Line主動推播測試
var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1574577182',
    channelSecret: 'c05559be60a96b1c97ec1e23e66dfe34',
    channelAccessToken: 'IuH6YSRirA0lKr2RRbRXaXCr0ysuVmaNpPBi8VLh0nLj7hOOIexln58+JAswGF71Jpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z74JdtfRJe4IizHpQ9k5QmqLTNIRUvV+8YRKnkkYLJiH7AdB04t89/1O/w1cDnyilFU='
});

//const ME = 'Ubb9f5c58d8fc3755bc871dcda17439f6';//'U39df481b54d0db051fe29d3a94b5b887';
//bot.push(ME, {
//    type: 'text',
//    text: '女王呼喚：\n\n快去洗鳥！！'
//});
//const SAM = 'Uf11e08fe2c7bbabff46ad97b52806f3a';//'U96297178ee6ec3fbfe6d399b5b1e92e7';
//bot.push(SAM, {
//    type: 'text',
//    text: '讚讚讚！！'
//});

//------------------------------------------------------------
console.log('取得相簿裡的所有照片');
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


//------------------------------------------------------------
console.log('資料庫測試');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
var url = 'mongodb://admin:tartan@ds235840.mlab.com:35840/heroku_p97hnb3x';
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
});
// Insert Data
var insertDocuments = function (db, callback) {
    var collection = db.collection('test1');
    collection.insert([
        { name: 'Sam', age: 40 },
        { name: 'Brandon', age: 40 }
    ],
        function (err, result) {
            assert.equal(err, null);
            assert.equal(2, result.result.n);
            assert.equal(2, result.ops.length);
            console.log("Inserted 2 documents into the userProfile collection\n");
            callback(result);
        });
}
// Read Data
var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('test1');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        callback(docs);
    });
}
//console.log(docs);
console.log('==================');