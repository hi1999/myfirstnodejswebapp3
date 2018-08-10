var express = require('express');
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
