var express = require('express');
var fs = require('fs');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
    var str = content.toString();
    console.log(str);
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), ReadGoogleSheet);

    console.log(str.length);
    console.log('finish');
});

function authorize(credentials, callback) {
    console.log('---------------------------authorize');
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        //console.log('---------------------------token:' + JSON.parse(token));
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
    console.log('---------------------------authorize#');
}

function ReadGoogleSheet(auth) {
    console.log('---------------------------ReadGoogleSheet');
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('---------------------------1');

    sheets.spreadsheets.values.get({
        spreadsheetId: '1GrvkbHdttGR8cG3M494MIqj5TvwNBts3Miy0ZszdQLo',
        range: 'Class Data!A2:E',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                console.log(`${row[0]}, ${row[4]}`);
            });
        } else {
            console.log('No data found.');
        }
    });
}
console.log('--------------------------------------------1');





const app = express();

app.get("/", function (req, res) {
    res.send('Hello World!')
    console.log('Hello World!');
});

//app.listen(3000);

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
