var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var signature = req.signature;
  var timestamp = req.timestamp;
  var nonce = req.nonce;
  var arr = [signature,timestamp,nonce];
  var str =arr.sort().join();
  var sha1 = crypto.createHash('sha1');
  var swo = sha1(str);
  if( swo == signature ){
    return true;
  }else{
    return false;
  }
  res.send('respond with a resource');
});

module.exports = router;
