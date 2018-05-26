var linebot = require('linebot');
var express = require('express');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var xlsx = require('node-xlsx');

var bot = linebot({
    channelId: '1574577182',
    channelSecret: 'c05559be60a96b1c97ec1e23e66dfe34',
    channelAccessToken: 'IuH6YSRirA0lKr2RRbRXaXCr0ysuVmaNpPBi8VLh0nLj7hOOIexln58+JAswGF71Jpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z74JdtfRJe4IizHpQ9k5QmqLTNIRUvV+8YRKnkkYLJiH7AdB04t89/1O/w1cDnyilFU='
});

console.log('收到的event:');
console.log(event); 

var rp = require('request-promise');
console.log(rp);

exports.reply = function justReply(req, res) {

    const promises = req.body.events.map(event => {

        var msg = event.message.text;
        var reply_token = event.replyToken;

        var target_albumId = "";

        if (msg.includes('hi')) {
            target_albumId = 'ZaDbl2w';
        } else {
            return;
        }

        var imgur_options = {
            method: 'GET',
            uri: 'https://api.imgur.com/3/album/ZaDbl2w/images',
            headers: {
                "Authorization": "Client-ID c5059e019ff8903"
            },
            json: true
        };


        return rp(imgur_options)
            .then(function (imgur_response) {

                // collect image urls from the album
                var array_images = [];
                imgur_response.data.forEach(function (item) {
                    array_images.push(item.link);
                })

                // choose one of images randomly
                var target_imageUrl = array_images[Math.floor(Math.random() * array_images.length)];

                var lineReply_options = {
                    method: 'POST',
                    uri: "https://api.line.me/v2/bot/message/reply",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": "Bearer IuH6YSRirA0lKr2RRbRXaXCr0ysuVmaNpPBi8VLh0nLj7hOOIexln58+JAswGF71Jpv5pnp8fBrC6kO0rG4bq1detk7Qh40XADbWE524z74JdtfRJe4IizHpQ9k5QmqLTNIRUvV+8YRKnkkYLJiH7AdB04t89/1O/w1cDnyilFU="
                    },
                    json: true,
                    body: {
                        replyToken: reply_token,
                        messages: [
                            {
                                type: 'image',
                                originalContentUrl: target_imageUrl.replace("http", "https"),
                                previewImageUrl: target_imageUrl.replace("http", "https")
                            }
                        ]
                    }
                };

                return rp(lineReply_options);

            })
            .catch(function (err) {
                console.log(err);
            });

    });

    Promise
        .all(promises)
        .then(() => res.json({ success: true }));


};