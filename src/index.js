import express from 'express';
import request from 'request';
import cheerio from 'cheerio';
import {
  VIDEO
} from './util/helpers';
let app = express();

app.get('/watch', (req, res) => {
    let params = req.query;
    let url = `http://www.youtube.com/get_video_info?&video_id=${params.v}`;
    request(url, (err, response, resp) => {
        if(err) return res.send(err);
        let V = new VIDEO(resp);
        res.send(V.bestQuality());
    });
});
app.get('/debug', (req, res) => {
    let params = req.query;
    let url = `http://www.youtube.com/get_video_info?&video_id=${params.v}`;
    request(url, (err, response, resp) => {
        if(err) return res.send(err);
        let V = new VIDEO(resp);
        res.send(V.data);
    });
});
app.get('/pipe', (req,res) => {
  if(req.query.url){
    request(new Buffer(req.query.url, 'base64').toString('ascii'), (err, response, resp) => {
      if(err) return res.send(err);
      res.send(resp);
    });
  }
})
app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
