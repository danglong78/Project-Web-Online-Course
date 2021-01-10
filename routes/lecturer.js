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
route.get('/create',isAuthenticated,async function(req,res){
    let category= await getAllCate();
    res.render('lecturer/create_course',{category:category});
})
route.post('/create', isAuthenticated,function (req, res, next) {
    upload.receive_infor(req, res);
});
route.post('/upload_img',isAuthenticated, function (req, res, next) {
    upload.receive_img(req, res);
});
route.post('/upload_vid',isAuthenticated, function (req, res, next) {
    upload.receive_vid(req, res);
});
route.get('/courses', isAuthenticated, async function (req, res) {
    getCourse(req,res)
});
route.get('/setting', isAuthenticated, async function (req, res) {
    let credential = await credentialModel.findOne({user:req.user.id})
    let lecturer = await lecturerModel.findById(req.user.id)
    res.render("lecturer/setting",{credential,lecturer})
});
route.post('/changePassword', isAuthenticated,  function (req, res) {
    changePassword(req,res);

});
route.post('/changeSetting', isAuthenticated,  function (req, res) {
    changeProfile(req,res);
});
route.post('/delCourse', isAuthenticated,  function (req, res) {
    delCourse(req,res);
});
route.get('/edit',isAuthenticated,function (req,res) {
    editCourse.getCourseInfor(req,res);
})
route.post('/delLecture',isAuthenticated,function (req,res) {
    editCourse.deleteLecture(req,res)
})
route.post('/delChapter',isAuthenticated,function (req,res) {
    editCourse.deleteChapter(req,res)
})
route.post('/editLecture',isAuthenticated,function (req,res) {
    editCourse.editLecture(req,res)
})
route.post('/editChapter',isAuthenticated,function (req,res) {
    editCourse.editChapter(req,res)
})
route.post('/addLecture',isAuthenticated,function (req,res) {
    editCourse.addLecture(req,res)
})
route.post('/addChapter',isAuthenticated,function (req,res) {
    editCourse.addChapter(req,res)
})
route.post('/addLecture_video',isAuthenticated,function (req,res) {
    editCourse.receiveVideo(req,res)
})
route.post('/addChapter_video',isAuthenticated,function (req,res) {
    editCourse.receiveMultiVideo(req,res)
})



module.exports = route

