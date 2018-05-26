var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1582182960',
    channelSecret: 'c704241b69cade92ab8798ad5c3b3e5b',
    channelAccessToken: 'LT+LkDLR3McBFEiVtGJcLx4VFF7bLqC8/VtmZk/2rfcQEze6mIIyPq3Xg2g2I1poURhGfv1fCxAY4uD5t5dkzhNP+BbXiseCTm9Zprtc1MZITPN1Rvo9021XUZ590fPE+hg7+wTiq5ruhW2s5aCHRwdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {

    //把收到訊息的 event 印出來看看
    console.log('收到的event:');
    console.log(event); 
    
    //===========================================================
    //回覆訊息功能-測試OK   
    //console.log('##測試==>回覆訊息功能');
    //event.reply("圖片").then(function (data) {
    //    console.log('success', data);
    //}).catch(function (error) {
    //    console.log('Error', error);
    //    });
    //console.log('##');
    //===========================================================

    //===========================================================
    //回覆Comfirm Template功能-測試OK
    //console.log('##測試==>回覆Comfirm Template功能');
    //event.reply({
    //    type: 'template',
    //    altText: 'this is a confirm template',
    //    template: {
    //        type: 'confirm',
    //        text: 'Are you sure?',
    //        actions: [{
    //            type: 'message',
    //            label: 'Yes',
    //            text: 'yes'
    //        }, {
    //            type: 'message',
    //            label: 'No',
    //            text: 'no'
    //        }]
    //    }
    //});
    //console.log('##');
    //===========================================================
    
   

    //===========================================================
    //測試連結Google試算表功能
    console.log('##測試==>連結Google試算表');
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
    let fs = require('fs');
    let readline = require('readline');
    const google = require("googleapis");
    const { OAuth2Client } = require("google-auth-library");

    let SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //you can add more scopes according to your permission need. But in case you chang the scope, make sure you deleted the ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json file
    const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/'; //the directory where we're going to save the token
    const TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json'; //the file which will contain the token

    class Authentication {
        authenticate() {
            return new Promise((resolve, reject) => {
                let credentials = this.getClientSecret();
                let authorizePromise = this.authorize(credentials);
                authorizePromise.then(resolve, reject);
            });
        }
        getClientSecret() {
            return require('./credentials.json');
        }
        authorize(credentials) {
            var clientSecret = credentials.installed.client_secret;
            var clientId = credentials.installed.client_id;
            var redirectUrl = credentials.installed.redirect_uris[0];
            const auth = new OAuth2Client(clientId, clientSecret, redirectUrl);
            var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

            return new Promise((resolve, reject) => {
                // Check if we have previously stored a token.
                fs.readFile(TOKEN_PATH, (err, token) => {
                    if (err) {
                        this.getNewToken(oauth2Client).then((oauth2ClientNew) => {
                            resolve(oauth2ClientNew);
                        }, (err) => {
                            reject(err);
                        });
                    } else {
                        oauth2Client.credentials = JSON.parse(token);
                        resolve(oauth2Client);
                    }
                });
            });
        }
        getNewToken(oauth2Client, callback) {
            return new Promise((resolve, reject) => {
                var authUrl = oauth2Client.generateAuthUrl({
                    access_type: 'offline',
                    scope: SCOPES
                });
                console.log('Authorize this app by visiting this url: \n ', authUrl);
                var rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl.question('\n\nEnter the code from that page here: ', (code) => {
                    rl.close();
                    oauth2Client.getToken(code, (err, token) => {
                        if (err) {
                            console.log('Error while trying to retrieve access token', err);
                            reject();
                        }
                        oauth2Client.credentials = token;
                        this.storeToken(token);
                        resolve(oauth2Client);
                    });
                });
            });
        }
        storeToken(token) {
            try {
                fs.mkdirSync(TOKEN_DIR);
            } catch (err) {
                if (err.code != 'EEXIST') {
                    throw err;
                }
            }
            fs.writeFile(TOKEN_PATH, JSON.stringify(token));
            console.log('Token stored to ' + TOKEN_PATH);
        }
    }

    module.exports = new Authentication();
    console.log(module.exports);
    var doc = new GoogleSpreadsheet('1GjY1OKGyO_QMLTk4G10J_cCpb_rAbKXcMs8Q2aLrHEo');
    console.log(doc);
    //===========================================================

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
