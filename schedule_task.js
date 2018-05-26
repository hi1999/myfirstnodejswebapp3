
console.log('=====測試排程=====');
console.log(Date.now());


//Line主動推播測試
const ME = 'U39df481b54d0db051fe29d3a94b5b887';
bot.push(ME, {
    type: 'text',
    text: '女王呼喚：\n\n快去洗碗！！'
});

console.log('==================');