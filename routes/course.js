var express = require('express');
var uploadImg= require(__basedir + '/controllers/course').UploadImgMiddleware;
var router = express.Router();

course_detail_view = async function (req,res) {
    res.render('course_detail_view');
}
create_course = async function (req,res) {
    res.render('create_course');
}
receive_infor = async function (req,res) {
    console.log(req.body);
    res.send('Receive information Success');
}
receive_img = async function (req,res) {
    await uploadImg(req,res, (err) =>{
        if(err){
            console.log(err);
            res.send(err);
        }else{

            res.send('Receive image sucesss');
            console.log('img uploaded succcessfully');

        }
    });
}
module.exports = {
    course_detail_view,
    create_course,
    receive_infor,
    receive_img
}