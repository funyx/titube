'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _base = require('base-64');

var _base2 = _interopRequireDefault(_base);

var _helpers = require('./util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/watch', function (req, res) {
    var params = req.query;
    var url = 'http://www.youtube.com/get_video_info?&video_id=' + params.v;
    (0, _request2.default)(url, function (err, response, resp) {
        if (err) return res.send(err);
        var V = new _helpers.VIDEO(resp);
        res.send(V.bestQuality());
    });
});
app.get('/debug', function (req, res) {
    var params = req.query;
    var url = 'http://www.youtube.com/get_video_info?&video_id=' + params.v;
    (0, _request2.default)(url, function (err, response, resp) {
        if (err) return res.send(err);
        var V = new _helpers.VIDEO(resp);
        res.send(V.data);
    });
});
app.get('/pipe', function (req, res) {
    if (req.query.url) {
        (0, _request2.default)(_base2.default.decode(req.query.url), function (err, response, resp) {
            if (err) return res.send(err);
            res.send(resp);
        });
    }
});
app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;
//# sourceMappingURL=index.js.map