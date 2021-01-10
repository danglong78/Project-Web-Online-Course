const express = require("express");
const router = express.Router();
const courseModel = require('../models/course').model
const studentModel =require('../models/student').model
const lectureModel = require('../models/lecturer').model
router.get('/:id',  async (req,res)=>{
    let id= req.params.id;
    let course = await courseModel.findById(id)
    let lecture = await  lectureModel.findById(course.lecturer).lean()
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
    res.render('course_detail_view',{course:course,lecturer:lecture,cats: __categories,averageRate,ratesPercent,studentReviewName})

})

module.exports = router;
