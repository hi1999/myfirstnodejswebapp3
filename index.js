var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1582182960',
    channelSecret: 'c704241b69cade92ab8798ad5c3b3e5b',
    channelAccessToken: 'LT+LkDLR3McBFEiVtGJcLx4VFF7bLqC8/VtmZk/2rfcQEze6mIIyPq3Xg2g2I1poURhGfv1fCxAY4uD5t5dkzhNP+BbXiseCTm9Zprtc1MZITPN1Rvo9021XUZ590fPE+hg7+wTiq5ruhW2s5aCHRwdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {

    console.log('收到的event:'+event); //把收到訊息的 event 印出來看看
    
    
    //回覆訊息功能-測試OK   
    console.log('##測試==>回覆訊息功能');
    event.reply("圖片").then(function (data) {
        console.log('success', data);
    }).catch(function (error) {
        console.log('Error', error);
        });
    console.log('##');
 
    //回覆Comfirm Template功能-測試OK
    console.log('##測試==>回覆Comfirm Template功能');
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
    console.log('##');
    
   
    
    //測試連結Google試算表功能
    console.log('##測試==>連結Google試算表功');
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
    var GoogleSpreadsheet = require('google-spreadsheet');
    var async = require('async');

    // spreadsheet key is the long id in the sheets URL
    var doc = new GoogleSpreadsheet('1GjY1OKGyO_QMLTk4G10J_cCpb_rAbKXcMs8Q2aLrHEo');
    var sheet;

    async.series([
        function setAuth(step) {
            // see notes below for authentication instructions!
            var creds = require('./client_secret.json');
            // OR, if you cannot save the file locally (like on heroku)
            var creds_json = {
                client_email: 'pchunfan@google.com',
                private_key: 'n1dRke7L5V5dtUK4J23lXTGC'
            }

            doc.useServiceAccountAuth(creds, step);
        },
        function getInfoAndWorksheets(step) {
            doc.getInfo(function (err, info) {
                console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
                sheet = info.worksheets[0];
                console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
                step();
            });
        },
        function workingWithRows(step) {
            // google provides some query options
            sheet.getRows({
                offset: 1,
                limit: 20,
                orderby: 'col2'
            }, function (err, rows) {
                console.log('Read ' + rows.length + ' rows');

                // the row is an object with keys set by the column headers
                rows[0].colname = 'new val';
                rows[0].save(); // this is async

                // deleting a row
                rows[0].del();  // this is async

                step();
            });
        },
        function workingWithCells(step) {
            sheet.getCells({
                'min-row': 1,
                'max-row': 5,
                'return-empty': true
            }, function (err, cells) {
                var cell = cells[0];
                console.log('Cell R' + cell.row + 'C' + cell.col + ' = ' + cell.value);

                // cells have a value, numericValue, and formula
                cell.value == '1'
                cell.numericValue == 1;
                cell.formula == '=ROW()';

                // updating `value` is "smart" and generally handles things for you
                cell.value = 123;
                cell.value = '=A1+B2'
                cell.save(); //async

                // bulk updates make it easy to update many cells at once
                cells[0].value = 1;
                cells[1].value = 2;
                cells[2].formula = '=A1+B1';
                sheet.bulkUpdateCells(cells); //async

                step();
            });
        },
        function managingSheets(step) {
            doc.addWorksheet({
                title: 'my new sheet'
            }, function (err, sheet) {

                // change a sheet's title
                sheet.setTitle('new title'); //async

                //resize a sheet
                sheet.resize({ rowCount: 50, colCount: 20 }); //async

                sheet.setHeaderRow(['name', 'age', 'phone']); //async

                // removing a worksheet
                sheet.del(); //async

                step();
            });
        }
    ], function (err) {
        if (err) {
            console.log('Error: ' + err);
        }
        });

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
