var courseModel= require(__basedir+'/models/course').model;

const deleteCourse= async (req,res) =>{
    try{
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