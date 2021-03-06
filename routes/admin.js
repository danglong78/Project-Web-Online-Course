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
const userRouter = require("./admin_user");
const accountSetting = require('../controllers/admin/accountSetting');
const changePassword =require('../controllers/credential/changepassword').changePassword
const disableCourse = require('../controllers/lecturer/editCourse').disable_course;
const openCourse = require('../controllers/lecturer/editCourse').able_course;


router.get('/',async  function (req,res){
    let credential = await  userModel.findOne({user:req.user.id})
    let admin =  await  ad_User.findOne({_id:req.user.id})
    res.render("admin/setting",{statics:__statics,admin,credential})
})
router.post("/",async function (req,res) {
    await accountSetting(req,res)
})
router.post('/changePassword',async function (req,res) {
    await changePssword(req,res)

})

router.get('/courses', async function (req,res) {
    try {
        let course = await courseModel.findWithDeleted();
        console.log(course.length);
        let courseArr = [];
        for (let x of course) {
            let mainCate = await Cate.findOneWithDeleted({_id:x.category})
            let subCate = await SubCate.findOneWithDeleted({_id:x.subCategory})
            let aLecturer = await lec_User.findOneWithDeleted({_id:x.lecturer})
            courseArr.push({ _id: x._id,isDisabled:x.deleted ,title: x.title, mainCate: mainCate.name, subCate: subCate.name, Lecturer_name: aLecturer.name })
        }
        res.render('admin/course', { course: courseArr ,statics:__statics});

    } catch (e) {
        console.log(e);
        res.render('error');
    }
});
router.post('/delCourse',async  function (req,res) {
    await disableCourse(req,res)
})
router.post('/openCourse',async  function (req,res) {
    await openCourse(req,res)
})
router.use("/category", cateRouter);
router.use("/user",userRouter);

module.exports = {
    router,
}