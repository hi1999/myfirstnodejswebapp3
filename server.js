'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

//------------------------------------------------------------
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});
client.connect();
//------------------------------------------------------------
//var request = require('request');
//var options = {
//    url: 'https://api.imgur.com/3/album/ZaDbl2w/images',
//    headers: { 'Authorization': 'Client-ID c5059e019ff8903' }
//};
//var i = 0;
//function callback(error, response, body) {
//    if (!error && response.statusCode == 200) {
//        var info = JSON.parse(body);
//        for (i = 0; i < info.data.length; i++) {
//            console.log(info.data[i].link);
//        }
//    }
//}
//request(options, callback);

//------------------------------------------------------------
//var https = require('https');
//var options = {
//    hostname: 'api.imgur.com',
//    path: '/3/album/ZaDbl2w/images',
//    headers: { 'Authorization': 'Client-ID c5059e019ff8903' },
//    method: 'GET'
//};
//var req = https.request(options, function (res) {
//    //console.log('statusCode:', res.statusCode);
//    //console.log('headers:', res.headers);
    
//    //console.log('link', res.headers.data.link);
//    res.on('data', function (d) {
//        //process.stdout.write(d);
//        var dtmp = d.toString();
//        //console.log('dtmp', dtmp);
//        var array = dtmp.split('{\"data\":[');
//        console.log(array.length);
//        console.log('###############################' + array[0]);
//        //var dddd = JSON.parse(dtmp);
//        //console.log('--------------------------');
//        //console.log('d', data.success);
//        //console.log('--------------------------');
//        //console.log('link',d.link);
//    });
//});

//req.on('error', function (e) {
//    console.error(e);
//});

//req.end();


//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.write('Hi\n');
//    res.end('Hello World !\n');

//}).listen(port);


