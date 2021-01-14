var credentialModel = require('../../models/credential').model;

const block_user = async function(req,res){
    const id = req.user.id;
    var aUser = await credentialModel.findById(id);
    if(aUser==null){
        res.send({success: false});
    }else{
        aUser.isDisabled = true;
        res.send({success: true});
    }
}

const unblock_user = async function (req, res) {
    const id = req.user.id;
    var aUser = await credentialModel.findById(id);
    if (aUser == null) {
        res.send({ success: false });
    } else {
        aUser.isDisabled = false;
        res.send({ success: true });
    }
}

module.exports = {
    User_blocked : block_user,
    User_unblocked: unblock_user
}