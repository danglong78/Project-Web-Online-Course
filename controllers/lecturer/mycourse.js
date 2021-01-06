
var courseModel= require(__basedir+'/models/course').model;

getMyCourse= async function(req,res,next){
    let course = await courseModel.find({teacher:req.user.id})
    return course
}