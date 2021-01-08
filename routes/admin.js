var express = require('express');
var cateController = require('../controllers/category/admin_category_view');
var courseModel = require('../models/course').model;
var Cate = require('../models/category').model;
var SubCate = require('../models/subCategory').model;
var userModel = require('../models/credential').model;
const admin_view_Cate = function (res) {
    cateController.admin_Cate_View(res);
};
const admin_view_Course = async function (res) {
    try {
        let course = await courseModel.find();
        let courseArr = [];
        for (let x of course) {
            let mainCate = await Cate.findById(x.category)
            let subCate = await SubCate.findById(x.subCategory)
            courseArr.push({ _id: x._id, title: x.title, mainCate: mainCate.name, subCate: subCate.name })
        }
        console.log(courseArr)
        res.render('admin/course', { course: courseArr });

    } catch (e) {
        res.render('error');
    }
};
const admin_view_User = async function (res) {
    try {
        let user = await userModel.find();
        res.render('admin/user', { user: user });

    } catch (e) {
        res.render('error');
    }
}
module.exports = {
    View_Cate: admin_view_Cate,
    View_Course: admin_view_Course,
    View_User: admin_view_User
}