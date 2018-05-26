
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

const ME = 'U39df481b54d0db051fe29d3a94b5b887';
bot.push(ME, {
    type: 'text',
    text: '女王呼喚：\n\n快去洗碗！！'
});
const SAM = 'U96297178ee6ec3fbfe6d399b5b1e92e7';
bot.push(SAM, {
    type: 'text',
    text: '讚讚讚！！'
});


console.log('==================');