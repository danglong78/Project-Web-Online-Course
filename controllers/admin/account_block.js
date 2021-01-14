var credentialModel = require('../../models/credential').model;

const block_user = async function(req,res){
    const id = req.body.id;
    console.log(id)
    let aUser = await credentialModel.findOne({_id:id});
    if(aUser==null){
        res.send({success: false});
    }else{
        aUser.isDisabled = true;
        await  aUser.save();
        res.send({success: true});
    }
}

const unblock_user = async function (req, res) {
    const id = req.body.id;
    var aUser = await credentialModel.findOne({_id: id});
    if (aUser == null) {
        res.send({ success: false });
    } else {
        aUser.isDisabled = false;
        await  aUser.save();
        res.send({ success: true });
    }
}

module.exports = {
    User_blocked : block_user,
    User_unblocked: unblock_user
}