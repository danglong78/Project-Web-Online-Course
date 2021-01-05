const express = require('express');
const route= express.Router();
const upload= require('../controllers/lecturer/create_course')
const categoryModel= require('../models/category').model
const subCategoryModel = require('../models/subCategory').model
const isAuthenticated = require('../controllers/middlewares').isAuthenticated;


route.get('/create',isAuthenticated,async function(req,res){
    let maincategory = await categoryModel.find();
    let category=[];
    for (const i of maincategory) {
        let subCategory = await subCategoryModel.find({_id: i.subCate});
        category.push({_id:i._id,name: i.name,subCategory})
    }

    console.log(category)
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
route.get('/mycourse', isAuthenticated, function (req, res, next) {

});


module.exports = route

