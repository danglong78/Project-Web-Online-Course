const express = require('express');
const route= express.Router();
const upload= require('../controllers/lecturer/create_course')
const credentialModel = require('../models/credential').model;
const lecturerModel = require('../models/lecturer').model;
const changePassword = require('../controllers/credential/changepassword').changePassword;
const isAuthenticated = require('../controllers/middlewares').isAuthenticated;
const changeProfile = require('../controllers/lecturer/profileSetting').accountSetting;
const getCourse = require('../controllers/lecturer/mycourse')
const getAllCate = require('../controllers/category/getAll')
const delCourse = require('../controllers/course/deleteCourse').deleteCourse;
const editCourse = require('../controllers/lecturer/editCourse');
route.get('/create',async function(req,res){
    let category= await getAllCate();
    res.render('lecturer/create_course',{category:category,statics:__statics});
})
route.post('/create', function (req, res, next) {
    upload.receive_infor(req, res);
});
route.post('/upload_img', function (req, res, next) {
    upload.receive_img(req, res);
});
route.post('/upload_vid', function (req, res, next) {
    upload.receive_vid(req, res);
});
route.get('/courses',  async function (req, res) {
    getCourse(req,res)
});
route.get('/setting',  async function (req, res) {
    let credential = await credentialModel.findOne({user:req.user.id})
    let lecturer = await lecturerModel.findById(req.user.id)
    res.render("lecturer/setting",{credential,lecturer,statics:__statics})
});
route.post('/changePassword',   function (req, res) {
    changePassword(req,res);

});
route.post('/changeSetting',   function (req, res) {
    changeProfile(req,res);
});
route.post('/delCourse',   function (req, res) {
    delCourse(req,res);
});
route.get('/edit',function (req,res) {
    editCourse.getCourseInfor(req,res);
})
route.post('/delLecture',function (req,res) {
    editCourse.deleteLecture(req,res)
})
route.post('/delChapter',function (req,res) {
    editCourse.deleteChapter(req,res)
})
route.post('/editLecture',function (req,res) {
    editCourse.editLecture(req,res)
})
route.post('/editChapter',function (req,res) {
    editCourse.editChapter(req,res)
})
route.post('/addLecture',function (req,res) {
    editCourse.addLecture(req,res)
})
route.post('/addChapter',function (req,res) {
    editCourse.addChapter(req,res)
})
route.post('/addLecture_video',function (req,res) {
    console.log("ADD VIDEO LECTURE")
    editCourse.receiveVideo(req,res)
})
route.post('/addChapter_video',function (req,res) {
    console.log('ADD VIDEO CHAPTER')
    editCourse.receiveMultiVideo(req,res)
})
route.post('/edit',function (req,res) {
  console.log('EDIT COURSE')
  console.log(req.body)

    editCourse.editCourse(req,res)
})
route.post('/edit_img',function (req,res) {
    console.log('EDIT IMG')
    console.log(req.body)
    editCourse.receiveImage(req,res)
})



module.exports = route

