const express = require('express');
const route= express.Router();
const upload= require('../controllers/lecturer/create_course')
const categoryModel= require('../models/category').model;
const subCategoryModel = require('../models/subCategory').model;
const courseModel = require('../models/course').model;
const isAuthenticated = require('../controllers/middlewares').isAuthenticated;


route.get('/create',isAuthenticated,async function(req,res){
    let maincategory = await categoryModel.find();
    let category=[];
    for (const i of maincategory) {
        let subCategory = await subCategoryModel.find({_id: i.subCate});
        category.push({_id:i._id,name: i.name,subCategory})
    }
    res.render('lecturer/create_course',{category:category})
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
route.get('/mycourse', isAuthenticated, async function (req, res) {
    let course = await courseModel.find({lecturer:req.user.id})
    res.render("lecturer/my_courses")
});


module.exports = route

