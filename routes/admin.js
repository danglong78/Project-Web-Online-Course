var express = require('express');
var cateController = require('../controllers/category/admin_category_view');
var courseModel = require('../models/course').model;
var Cate = require('../models/category').model;
var SubCate = require('../models/subCategory').model;
var userModel = require('../models/credential').model;
var Stu_user = require('../models/student').model;
var lec_User = require('../models/lecturer').model;
var ad_User = require('../models/admin').model;
var router = express.Router();
const cateRouter = require("./category");

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
        for (var i = 0; i < user.length; i++) {
            var aUser;
            if (user[i].role == "Student") {
                aUser = await Stu_user.findById(user[i].user);
                user[i]["name"] = aUser.name;
            }
            else if (user[i].role == "Lecturer") {
                aUser = await lec_User.findById(user[i].user);
                user[i]["name"] = aUser.name;
            } else {
                aUser = await ad_User.findById(user[i].user);
                user[i]["name"] = aUser.name;
            }
        }
        res.render('admin/user', { user: user, statics: __statics });
    } catch (e) {
        res.render('error');
    }
}
router.use("/category", cateRouter);
module.exports = {
    router,
    View_Cate: admin_view_Cate,
    View_Course: admin_view_Course,
    View_User: admin_view_User
}