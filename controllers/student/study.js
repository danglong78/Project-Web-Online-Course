const  courseModel = require('../../models/course').model

const getCourse = async (req,res) =>{
    let course = await courseModel.findById(req.params.id)
    res.render("lecture_detail",{statics: __statics,course});

}
module.exports={getCourse}
