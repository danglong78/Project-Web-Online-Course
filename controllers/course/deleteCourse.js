var courseModel= require(__basedir+'/models/course').model;
const fs =require('fs')
const deleteCourse= async (req,res) =>{
    try{
        let course = await courseModel.findOne({_id:req.body.id})
        if(course !== undefined)
        {
            for(let i =0;i<course.chapter.length;i++)
            {
                for(let j=0; j<course.chapter[i].lecture.length;j++)
                {
                    try{
                        if(fs.existsSync(`.${course.chapter[i].lecture[j].file}`)){
                            fs.unlinkSync(`.${course.chapter[i].lecture[j].file}`)
                        }
                    }catch (e) {
                        console.log(e)
                    }
                }
            }
        }
        await courseModel.findOneAndRemove({_id:req.body.id}).exec(function (err,item) {
            if (err) {
                return res.json({success: false, msg: 'Cannot remove item'});
            }
            if (!item) {
                return res.status(404).json({success: false, msg: 'Course not found'});
            }

            res.json({success: true});
        })
    }catch (err)
    {
        res.send({success: false})
    }
}
module.exports={deleteCourse}