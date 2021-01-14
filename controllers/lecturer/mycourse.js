
var courseModel= require('../../models/course').model;
const lecturerModel = require('../../models/lecturer').model;
const categoryModel =require('../../models/category').model

const getMyCourse= async function(req,res){
    let lecturer = await lecturerModel.findOne({_id:req.user.id}).lean()
    let course = await courseModel.find({_id:lecturer.courses}).lean()
    for( let c of course)
    {
        let category = await categoryModel.findOne({_id:c.category}).lean()
        c.categoryName= category.name

    }
    res.render("lecturer/my_courses",{course:course,statics:__statics})
}
module.exports=getMyCourse