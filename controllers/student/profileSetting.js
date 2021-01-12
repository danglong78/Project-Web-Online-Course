var credentialModel= require('../../models/credential').model;
var studentModel = require('../../models/student').model

const accountSetting= async (req,res) =>{
    try{
        await credentialModel.findOneAndUpdate({user:req.user.id},{email:req.body.email}).exec(function (err,item) {
            if (err) {
                return res.json({success: false});
            }
            if (!item) {
                return res.status(404).json({success: false});
            }
        })
        await studentModel.findOneAndUpdate(
            {_id:req.user.id},
            {
                name:req.body.name,
            }).exec(function (err,item) {
            if (err) {
                return res.json({success: false});
            }
            if (!item) {
                return res.status(404).json({success: false});
            }
            res.send({success:true})
        })
    }catch (err)
    {
        res.send({success: false})
    }
}
module.exports=accountSetting