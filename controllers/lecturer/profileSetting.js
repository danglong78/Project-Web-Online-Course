var credentialModel= require('../../models/credential').model;
var lecturerModel = require('../../models/lecturer').model

const accountSetting= async (req,res) =>{
    try{

        await lecturerModel.findOneAndUpdate(
            {_id:req.user.id},
            {
                name:req.body.name,
                shortDescbibe:req.body.shortDes,
                detailDescribe:req.body.detailDes
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
module.exports={accountSetting}