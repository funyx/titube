import querystring from 'querystring';
export class VIDEO {
  constructor(data){
    this.data = querystring.parse(data);
    if(this.data.adaptive_fmts)this.data.adaptive_fmts = this.parseURLSTR(this.data.adaptive_fmts);
    if(this.data.url_encoded_fmt_stream_map)this.data.url_encoded_fmt_stream_map = this.parseURLSTR(this.data.url_encoded_fmt_stream_map);
    if(this.data.afv_ad_tag)this.data.afv_ad_tag = this.parseURLSTR(this.data.afv_ad_tag);
    if(this.data.caption_tracks)this.data.caption_tracks = this.parseURLSTR(this.data.caption_tracks);
    if(this.data.caption_translation_languages)this.data.caption_translation_languages = this.parseURLSTR(this.data.caption_translation_languages);
    // return this.data;
  }
  parseURLSTR(str){
    let obj = querystring.parse(str);
    return obj;
  }
  bestQuality = () => {
    //add #t=[start_time][,end_time] to the media URL.
    let v = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${this.data.title}</title>
      </head>
      <body>

      <video controls autoplay style="width:100%" poster="${this.data.iurlmaxres}">
      <source src="${this.data.url_encoded_fmt_stream_map.url[0]}"
              type='${this.data.url_encoded_fmt_stream_map.type[0]}'/>`;
      // v += `<track kind="subtitles" label="Italian" srclang="it" src="https://m.youtube.com/api/timedtext?sparams=asr_langs%2Ccaps%2Cv%2Cexpire&amp;signature=05ED52879297D56CE654812BAD0135D819C71391.7CB95227425238C954573B04A51310857D65E438&amp;asr_langs=ru%2Cko%2Cen%2Cpt%2Cde%2Cja%2Cit%2Cfr%2Cnl%2Ces&amp;hl=en-US&amp;expire=1475730347&amp;key=yttt1&amp;v=2QOx7vmjV2E&amp;caps=asr&amp;type=track&amp;lang=it&amp;name&amp;kind&amp;fmt=vtt">`;
    if(this.data.caption_tracks){
      if(Array.isArray(this.data.caption_tracks.n)){
        for(let i=0;i<this.data.caption_tracks.n.length;i++){
          if(i===0){
            let src = new Buffer(this.data.caption_tracks.u[i]+'&fmt=vtt&type=track').toString('base64'),
                label = this.data.caption_tracks.n[i],
                iso = this.data.caption_tracks.lc[i];
            v+= `<track label="${label}" kind="subtitles" srclang="${iso}" src="/pipe?url=${src}" default>`;
          }else{
            let src = new Buffer(this.data.caption_tracks.u[i]+'&fmt=vtt&type=track').toString('base64'),
                label = this.data.caption_tracks.n[i],
                iso = this.data.caption_tracks.lc[i];
            v+= `<track label="${label}" kind="subtitles" srclang="${iso}" src="/pipe?url=${src}">`;
          }
        }
      }else{
        let src = new Buffer(this.data.caption_tracks.u+'&fmt=vtt&type=track').toString('base64'),
            label = this.data.caption_tracks.n,
            iso = this.data.caption_tracks.lc;
        v+= `<track label="${label}" kind="subtitles" srclang="${iso}" src="/pipe?url=${src}" default>`;
      }
    }
    v += `</video></body>
  </html>`;
    return v;
  }
}
