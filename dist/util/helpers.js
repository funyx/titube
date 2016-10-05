'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIDEO = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _base = require('base-64');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VIDEO = exports.VIDEO = function () {
  function VIDEO(data) {
    var _this = this;

    _classCallCheck(this, VIDEO);

    this.bestQuality = function () {
      //add #t=[start_time][,end_time] to the media URL.
      var v = '<video controls autoplay>\n      <source src="' + _this.data.url_encoded_fmt_stream_map.url[0] + '"\n              type=\'' + _this.data.url_encoded_fmt_stream_map.type[0] + '\'/>';
      // v += `<track kind="subtitles" label="Italian" srclang="it" src="https://m.youtube.com/api/timedtext?sparams=asr_langs%2Ccaps%2Cv%2Cexpire&amp;signature=05ED52879297D56CE654812BAD0135D819C71391.7CB95227425238C954573B04A51310857D65E438&amp;asr_langs=ru%2Cko%2Cen%2Cpt%2Cde%2Cja%2Cit%2Cfr%2Cnl%2Ces&amp;hl=en-US&amp;expire=1475730347&amp;key=yttt1&amp;v=2QOx7vmjV2E&amp;caps=asr&amp;type=track&amp;lang=it&amp;name&amp;kind&amp;fmt=vtt">`;
      if (_this.data.caption_tracks) {
        if (Array.isArray(_this.data.caption_tracks.n)) {
          for (var i = 0; i < _this.data.caption_tracks.n.length; i++) {
            if (i === 0) {
              var src = _base2.default.encode(_this.data.caption_tracks.u[i] + '&fmt=vtt&type=track');
              v += '<track label="' + _this.data.caption_tracks.n[i] + '" kind="subtitles" srclang="' + _this.data.caption_tracks.lc[i] + '" src="/pipe?url=' + src + '" default>';
            } else {
              var _src = _base2.default.encode(_this.data.caption_tracks.u[i] + '&fmt=vtt&type=track');
              v += '<track label="' + _this.data.caption_tracks.n[i] + '" kind="subtitles" srclang="' + _this.data.caption_tracks.lc[i] + '" src="/pipe?url=' + _src + '">';
            }
          }
        } else {
          var _src2 = _base2.default.encode(_this.data.caption_tracks.u + '&fmt=vtt&type=track');
          v += '<track label="' + _this.data.caption_tracks.n + '" kind="subtitles" srclang="' + _this.data.caption_tracks.lc + '" src="/pipe?url=' + _src2 + '" default>';
        }
      }
      v += '</video>';
      return v;
    };

    this.data = _querystring2.default.parse(data);
    if (this.data.adaptive_fmts) this.data.adaptive_fmts = this.parseURLSTR(this.data.adaptive_fmts);
    if (this.data.url_encoded_fmt_stream_map) this.data.url_encoded_fmt_stream_map = this.parseURLSTR(this.data.url_encoded_fmt_stream_map);
    if (this.data.afv_ad_tag) this.data.afv_ad_tag = this.parseURLSTR(this.data.afv_ad_tag);
    if (this.data.caption_tracks) this.data.caption_tracks = this.parseURLSTR(this.data.caption_tracks);
    if (this.data.caption_translation_languages) this.data.caption_translation_languages = this.parseURLSTR(this.data.caption_translation_languages);
    // return this.data;
  }

  _createClass(VIDEO, [{
    key: 'parseURLSTR',
    value: function parseURLSTR(str) {
      var obj = _querystring2.default.parse(str);
      return obj;
    }
  }]);

  return VIDEO;
}();
//# sourceMappingURL=helpers.js.map