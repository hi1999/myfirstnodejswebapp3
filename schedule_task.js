
console.log('=====測試排程=====');
console.log(Date.now());


//Line主動推播測試
var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1582182960',
    channelSecret: 'c704241b69cade92ab8798ad5c3b3e5b',
    channelAccessToken: 'LT+LkDLR3McBFEiVtGJcLx4VFF7bLqC8/VtmZk/2rfcQEze6mIIyPq3Xg2g2I1poURhGfv1fCxAY4uD5t5dkzhNP+BbXiseCTm9Zprtc1MZITPN1Rvo9021XUZ590fPE+hg7+wTiq5ruhW2s5aCHRwdB04t89/1O/w1cDnyilFU='
});
const ME = 'U39df481b54d0db051fe29d3a94b5b887';
bot.push(ME, {
    type: 'text',
    text: '女王呼喚：\n\n快去洗碗！！'
});
const SAM = 'U96297178ee6ec3fbfe6d399b5b1e92e7';
bot.push(ME, {
    type: 'text',
    text: '讚讚讚！！'
});


console.log('==================');