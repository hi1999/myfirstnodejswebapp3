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

//query all table in this database ==>OK
//console.log('query all table in this database');
//client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//    if (err) throw err;
//    for (let row of res.rows) {
//        console.log(JSON.stringify(row));
//    }
//    //client.end();
//});
bot.on('message', function (event) {
//insert data ==>OK, 注意userid是KEY，重覆的會INSERT不進去
var user_id=event.source.userId;
console.log('insert table test1');
client.query(
    'INSERT into public.test1 (userid, cc, update_at) VALUES($1, $2, $3) ',
    [user_id + new Date(), 101, new Date()],
    function (err1, result) {
        if (err1) throw err1;
        //client.end();
    });

    
});

//update data
console.log('update table test1');
client.query("UPDATE public.test1 SET cc=cc+1 WHERE userid = 'Sam1'", (err2, res) => {
    if (err2) throw err2;
    //client.end();
});
//client.query(
//    "UPDATE public.test1 SET cc=102 WHERE userid = 'Sam1' ",
//    ['Sam2', 101, new Date()],
//    function (err, result) {
//        if (err) throw err;
//        //client.end();
//    });

//query table test1 ==>OK
console.log('query table test1');
client.query('SELECT * FROM public.test1;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
