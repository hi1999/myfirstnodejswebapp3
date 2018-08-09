var url = 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets.readonly&response_type=code&client_id=750075050536-ci75d0lt110ajk4plrrmci58ma1okvp8.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob';


var request = require('request');
var async = require('async');

exports.handler = function (req, res) {
    async.parallel([
        /*
         * First external endpoint
         */
        function (callback) {
            //var url = "http://external1.com/api/some_endpoint";
            request(url, function (err, response, body) {
                // JSON body
                if (err) { console.log(err); callback(true); return; }
                obj = JSON.parse(body);
                callback(false, obj);
            });
        },
        /*
         * Second external endpoint
         */
        function (callback) {
            //var url = "http://external2.com/api/some_endpoint";
            request(url, function (err, response, body) {
                // JSON body
                if (err) { console.log(err); callback(true); return; }
                obj = JSON.parse(body);
                callback(false, obj);
            });
        },
    ],
        /*
         * Collate results
         */
        function (err, results) {
            if (err) { console.log(err); res.send(500, "Server Error"); return; }
            res.send({ api1: results[0], api2: results[1] });
        }
    );
};

