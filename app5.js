const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if( num==1 & hand=='パー' ) judgement = '勝ち', win += 1;
  else if( num==1 & hand=='グー'  ) judgement = '引き分け';
  else if( num==1 & hand=='チョキ'  ) judgement = '負け';
  else if( num==2 & hand=='グー'  ) judgement = '勝ち', win += 1;
  else if( num==2 & hand=='チョキ'  ) judgement = '引き分け';
  else if( num==2 & hand=='パー'  ) judgement = '負け';
  else if( num==3 & hand=='チョキ'  ) judgement = '勝ち', win += 1;
  else if( num==3 & hand=='パー'  ) judgement = '引き分け';
  else judgement = '負け';
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/omikuji", (req, res) => {
  let selected = 0;
  if( req.query.radio1 ) selected = 1;
  if( req.query.radio2 ) selected = 2;
  if( req.query.radio3 ) selected = 3;
  const num = Math.floor( Math.random() * 6 + 1 );
  let omikuji = '';
  if( selected==1 ){
    if( num==1 ) omikuji = '大吉';
    if( num==2 ) omikuji = '中吉';
    if( num==3 ) omikuji = '小吉';
    if( num==4 ) omikuji = '末吉';
    if( num==5 ) omikuji = '凶';
    if( num==6 ) omikuji = '大凶';
  }
  if( selected==2 ){
    if( num==1 ) omikuji = '大吉';
    if( num==2 ) omikuji = '中吉';
    if( num==3 ) omikuji = '小吉';
    if( num==4 ) omikuji = '末吉';
    if( num==5 ) omikuji = '凶';
    if( num==6 ) omikuji = '大凶';
  }
  if( selected==3 ){
    if( num==1 ) omikuji = '大吉';
    if( num==2 ) omikuji = '中吉';
    if( num==3 ) omikuji = '小吉';
    if( num==4 ) omikuji = '末吉';
    if( num==5 ) omikuji = '凶';
    if( num==6 ) omikuji = '大凶';
  }
  console.log( 'あなたの運勢は' + omikuji + 'です' );
  res.render( 'omikuji', {number:num, omikuji:omikuji} );
});

app.get("/pokemon", (req, res) => {
  let selected = 0;
  if( req.query.radio1 ) selected = 1;
  if( req.query.radio2 ) selected = 2;
  if( req.query.radio3 ) selected = 3;
  const num = Math.floor( Math.random() * 3 + 1 );
  if( num==1 ) type = 'ほのおタイプ';
  else if( num==2 ) type = 'みずタイプ';
  else type = 'くさタイプ';
  let judgement = '';
  if( selected==1 ){
    if( num==1 ) judgement = '効果今ひとつ';
    if( num==2 ) judgement = '効果今ひとつ';
    if( num==3 ) judgement = '効果バツグン';
  }
  if( selected==2 ){
    if( num==1 ) judgement = '効果バツグン';
    if( num==2 ) judgement = '効果今ひとつ';
    if( num==3 ) judgement = '効果今ひとつ';
  }
  if( selected==3 ){
    if( num==1 ) judgement = '効果今ひとつ';
    if( num==2 ) judgement = '効果バツグン';
    if( num==3 ) judgement = '効果今ひとつ';
  }
  const display = {
    type: type,
    judgement: judgement,
  }
  res.render( 'pokemon', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

