const express = require("express");
const router = express.Router();
const courseModel = require('../models/course').model
const studentModel =require('../models/student').model
const lectureModel = require('../models/lecturer').model
const getRelatedCourses = require("../controllers/course/realated_course");
const isAuthenticated = require('../controllers/middlewares').isAuthenticated
const addWishList = require('../controllers/student/add_favorite')
const joinCourse = require('../controllers/student/join_course')
const delCourse = require('../controllers/student/delete_favorite')
const checkStudent = require('../controllers/student/isOwnedCourse');
const user_check = require('../controllers/middlewares');

router.get('/:id',  async (req,res)=>{
    let id= req.params.id;
    let course = await courseModel.findById(id)
    let lecture = await  lectureModel.findById(course.lecturer).lean()
    let otherCourse = await getRelatedCourses(`${id}`,`${course.subCategory}`, 5);
    let averageRate =0;
    let ratesPercent=[0,0,0,0,0]
    let studentReviewName=[]
    for (let i=0 ;i<course.rates.length;i++)
    {
        averageRate+=course.rates[i].score;
        ratesPercent[course.rates[i].score-1]+=1;
        let student = await studentModel.findById(course.rates[i].student).lean()
        studentReviewName.push(student.name)
    }
    averageRate=averageRate/course.rates.length;
    let isJoined;
    let isAddWishList;

    if(req.user === undefined) {
        isJoined = false;
        isAddWishList = false
    }
    else{
        isJoined= await checkStudent.Owned_check(`${req.user.id}`, `${course._id}`);
        isAddWishList = await checkStudent.Favorite_Check(`${req.user.id}`, `${course._id}`);

    }
    console.log(isJoined)
    console.log(isAddWishList)
    res.render('course_detail_view',{course:course,lecturer:lecture,statics: __statics,averageRate,ratesPercent,studentReviewName,otherCourse,isAddWishList,isJoined})

})
router.post('/buy/:id',user_check.isAuthenticated,user_check.isStudent,async function (req,res) {
    if(req.user.id===undefined)
        res.send({success:false})
    else {
        await joinCourse(`${req.user.id}`,`${req.params.id}`)
        res.send({success: true})
    }
})
router.get('/buy/:id',user_check.isAuthenticated,user_check.isStudent,function (req,res) {
    res.redirect(`/course/${req.params.id}`)
})
router.post('/addwishlist/:id',user_check.isAuthenticated,user_check.isStudent,async function (req,res) {
    if(req.user.id===undefined)
        res.send({success:false})
    else {
        await addWishList(`${req.user.id}`,`${req.params.id}`)
        res.send({success: true})
    }
})
router.get('/addwishlist/:id',user_check.isAuthenticated ,user_check.isStudent,function (req,res) {
    res.redirect(`/course/${req.params.id}`)
})
router.post('/delwishlist/:id',user_check.isAuthenticated ,user_check.isStudent,async function (req,res) {
    if(req.user.id===undefined)

        res.send({success:false})
    else {
        await delCourse(`${req.user.id}`,`${req.params.id}`)
        res.send({success: true})
    }
})
router.get('/delwishlist/:id',user_check.isAuthenticated ,user_check.isStudent,function (req,res) {
    res.redirect(`/course/${req.params.id}`)
})
module.exports = router;
