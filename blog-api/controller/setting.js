let fs = require('fs');
let path = require('path');
let SettingModel = require('../model/setting.js');

let find = (req, res, next) => { //查找个人信息
    SettingModel.find().then((data) => {
        res.send({ 'errcode': 0, 'list': data });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let update = (req, res, next) => { //更新个人信息
    let body = req.body;
    if (req.file) { //如果传的数据有图片
        SettingModel.find().then((data) => {
            let filePath = path.resolve(path.join('public', data[0].myHead.match(/\/uploads.+$/)[0])); //删除uploads下的旧图片
            fs.unlink(filePath, function (err) {
                if (err) {
                    console.log('删除文件失败');
                }
                else {
                    console.log('删除文件成功');
                }
            })
        })
        let myHead = req.file;
        fs.renameSync(path.join('./public/uploads', myHead.filename), path.join('./public/uploads', myHead.filename + '.jpg'));
        let data = {
            ...body,
            myHead: '192.168.26.1/uploads/' + myHead.filename + '.jpg'
        };
        SettingModel.updateOne({}, { $set: { "myName": data.myName, "myHead": data.myHead, "myTel": data.myTel, "myQQ": data.myQQ, "myMail": data.myMail } }).then(() => {
            res.send({ 'errcode': 0 });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
    else { //如果传的数据没有图片
        SettingModel.updateOne({}, { $set: { "myName": body.myName, "myTel": body.myTel, "myQQ": body.myQQ, "myMail": body.myMail } }).then(() => {
            res.send({ 'errcode': 0 });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
};

module.exports = {
    find,
    update
};