const  courseModel = require('../../models/course').model
const  studentModel = require('../../models/student').model
const getCourse = async (req,res) =>{
    let course = await courseModel.findById(req.params.id);
    let student = await studentModel.findById(req.user.id);
    let progress=[]
    for(var c of student.courses)
    {
        if (c.course==req.params.id)
            progress=c.progress;
    }
    res.render("lecture_detail",{statics: __statics,course,progress});

}
module.exports={getCourse}
