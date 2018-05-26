
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
var https = require('https');
var options = {
    hostname: 'api.imgur.com',
    path: '/3/album/ZaDbl2w/images',
    headers: { 'Authorization': 'Client-ID c5059e019ff8903' },
    method: 'GET'
};

var req = https.request(options, function (res) {
    //console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);
    
    //console.log('link', res.headers.data.link);
    res.on('data', function (d) {
        //process.stdout.write(d);
        console.log(d);
        console.log(d[0]);
        //console.log('link',d.link);
    });
});

req.on('error', function (e) {
    console.error(e);
});

req.end();

console.log('==================');