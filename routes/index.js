var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var fs = require('fs');
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('../jsapi_ticket.json','utf8', function (err, data) {
    if (err) throw err;
    var jsonObj = JSON.parse(data);
    console.log(typeof data);
    console.log(jsonObj);
  });


  https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi', function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    console.log(res);
    res.on('data', function(d) {
      process.stdout.write(d);
    });

  }).on('error', function(e) {
    console.error(e);
  });
  //router.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi',function(req,res,next){
  //  console.log(11111);
  //  console.log(res);
  //})
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  console.log(11111);

  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var token = 'zhouyunhui';
  var arr = [token,timestamp,nonce];
  var str =arr.sort().join('');
  var sha1 = crypto.createHash('sha1');
  sha1.update(str);
  var d = sha1.digest('hex');
  var echostr = req.query.echostr;
  if( d == signature ){
    res.send(echostr);
  }else{
    return false;
  }
  //res.render('index', { title: 'Express' });
});

module.exports = router;
