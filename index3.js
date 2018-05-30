var linebot = require('linebot');
var express = require('express');

console.log('start index3.js');
console.log('測試PostgreSQL');

var bot = linebot({
    channelId: '1574577182',
    channelSecret: '3e03bec3a3ee9e463ed76dfe7da3baec',
    channelAccessToken: 'NZXzzQ3o+VJYjHusBszu5QIoff22qIQ88z+F0fOFeFKIYsLtuYPB4XJAGY84LJIBJpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z77Sdumg1Hom12AXpa827FVnCoR81vbtvGoDlHCrX5MdmwdB04t89/1O/w1cDnyilFU='
});

//測試heroku-postgresql
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect();
console.log('連線OK');

//使用者加入機器人好友事件
bot.on('follow', function (event) {
    console.log('==================follow-使用者加入機器人好友事件');
    //1.讀取userid
    console.log('userId==>', event.source.userId);

    //2.判斷是否已存在於資料庫(假設可以建立表格，表格可以有欄位1表{user_id,user_name,start_time,friend,get_times})
    console.log('query table test1');
    client.query("SELECT count(*) FROM public.test1 where userid='B';", (err, res) => {
    //"SELECT * FROM public.test1;"需要加where userid=line userId,但目前userid太長無法加入
    if (err) throw err;
    for (let row of res.rows) {
        var bExist=row.count;
        console.log("回傳資料:"+bExist);
        //  2.1若尚未存在於資料庫，1表新增一筆資料 
        if(bExist=="0"){
            client.query(
                'INSERT into public.test1 (userid, cc, update_at) VALUES($1, $2, $3) ',
                ['B', 101, new Date()],
                function (err1, result) {
                    if (err1) throw err1;
                    //client.end();
            });

            console.log("新增一筆資料");


       }
        
        //  2.2若已存在資料庫，將1表"friend"欄位更新為Yes 
        if(bExist=="1"){
            client.query("UPDATE public.test1 SET cc=cc+1 WHERE userid = 'B'", (err2, res) => {
    if (err2) throw err2;
    //client.end();
                console.log("更新一筆資料");
});
        
        }
        console.log(JSON.stringify(row));
    }
    client.end();
});
    
    
});
//使用者刪除機器人好友事件
bot.on('unfollow', function (event) {
    console.log('==================unfollow-使用者刪除機器人好友事件');
    //1.讀取userid
    //2.於資料庫(假設可以建立表格，表格可以有欄位1表{user_id,user_name,start_time,friend})
    //  2.1若已存在資料庫，將"friend"欄位更新為No

});
//機器人加入群組時的事件
bot.on('join', function (event) { 
    console.log('==================join-機器人加入群組時的事件');
});
//機器人離開群組時的事件
bot.on('leave', function (event) {
    console.log('==================leave-機器人離開群組時的事件');
});;
//使用者透過套版訊息回應時的事件
bot.on('postback', function (event) {
    console.log('==================postback-使用者透過套版訊息回應時的事件');
});
//訊息事件
bot.on('message', function (event) {
    console.log('==================message-訊息事件');
    //1.判斷使用者傳送的訊息是否為"抽"
    //  1.1若不為抽，不處理
    //  1.2若為抽，於表1(假設可以建立表格，表格可以有欄位1表{user_id,user_name,start_time,friend,get_times})將get friends+1
    //  1.3若為抽，於表2(假設可以建立表格，表格可以有欄位2表{user_id,current_time,get_times})判斷該使用者當日抽圖資料是否已存在，若不存在心件資料，
    //     若存在將get times+1
    //把收到訊息的 event 印出來看看
    console.log('解析收到的event:');
    //console.log(event);
    console.log('type==>', event.type);
    console.log('replyToken==>', event.replyToken);
    console.log('userId==>', event.source.userId);
    console.log('==================');

});












const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
