var express = require('express');
var fs = require('fs');

fs.readFile('credentials.json', (err, content) => {
    var str = content.toString();
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    //authorize(JSON.parse(content), listMajors);

    console.log(str.length);
    console.log('finish');
});
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
