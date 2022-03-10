let UsersModel = require('../model/users.js');
var jwt = require('jsonwebtoken'); //生成token

let login = (req, res, next) => { //登录
  UsersModel.find({ username: req.body.username, password: req.body.password }).then((data) => {
    if (data.length) {
      jwt.sign({ username: req.body.username }, 'woshinibaba', function (err, token) { //生成token
        res.send({ "errcode": 0, token });  //将token响应回前端
      });
    }
    else {
      res.send({ 'errcode': -1 });
    }
  })
};

let register = (req, res, next) => { //注册
  UsersModel.insertMany([req.body]).then(() => {
    res.send({ 'errcode': 0 });
  }).catch(() => {
    res.send({ 'errcode': -1 });
  })
};

let info = (req, res, next) => { //token绑定身份信息
  let token = req.headers.token;
  jwt.verify(token, 'woshinibaba', function (err, decoded) { //验证token是否是正确的
    if (err) {
      res.json({
        errcode: -1,
        errmsg: 'token错误'
      });
    }
    else {    //用于登录页面数据回显
      UsersModel.find({ username: decoded.username }).then((data) => {
        console.log(data);
        res.json({
          errcode: 0,
          errmsg: 'token正确',
          username: data[0].username, 
          password: data[0].password,
        });
      })
    }
  });
};

module.exports = {
  login,
  register,
  info
};