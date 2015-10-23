var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var fs = require('fs');

var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
      sha1 = crypto.createHash('sha1');
      sha1.update(str);
  ret.signature = sha1.digest('hex');
  return ret;
};

var  getSignPackage = function(){
  var jsapi_ticket = getJsApiTicket();
}

function getJsApiTicket(){
  var path = '../jsapi_ticket.json';
  fs.readfile(paht,'utf-8', function (err,data) {
    if(err){
      throw  err;
    }else{
      var jsonObj = JSON.parse(data);
      var tickt = jsonObj.jsapi_ticket;
      var expireTime = jsonObj.expire_time;
      if(expireTime<new Date().getTime){
          var accessToken =  getAccessToken();
        // 如果是企业号用以下 URL 获取 ticket
        // $url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=$accessToken";
        var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token="+accessToken;
        https.get(url, function(res) {
          console.log("statusCode: ", res.statusCode);
          console.log("headers: ", res.headers);
          res.on('data', function(d) {
            process.stdout.write(d);
          });

        }).on('error', function(e) {
          console.error(e);
        });
      }
    }
  })
}

function getAccessToken(){
  var path = '../accessToken.json';
  fs.readfile(paht,'utf-8', function (err,data) {
    if(err){
      throw  err;
    }else{
      var jsonObj = JSON.parse(data);
      var tickt = jsonObj.access_token;
      var expireTime = jsonObj.expire_time;
      if(expireTime<new Date().getTime){

      }
    }
  })
}

module.exports = sign;
