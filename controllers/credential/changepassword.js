const credential = require("../../models/credential").model
const bcrypt = require("bcrypt");
const saltRounds = 10;
const changePassword = async (req, res) => {
        let user = await credential.findOne({user:req.user.id});
        if (user.password) {
            if ( await bcrypt.compare(req.body.oldPassword, user.password)) {
                user.password = req.body.newPassword;
                console.log(req.body.newPassword)
                console.log(req.body.oldPassword)
                const hash = await new Promise((resolve, reject) => {
                    bcrypt.hash(user.password, saltRounds, function (err, hash) {
                        if (err)
                            reject(err);
                        resolve(hash);
                    });
                })
                await credential.updateOne({ user: req.user.id }, { password: hash });
                res.send({success:true});

            }
            else{
                res.send({success:false});

            }
        }
        else {
            const hash = await new Promise((resolve, reject) => {
                bcrypt.hash(req.body.newPassword, saltRounds, function (err, hash) {
                    if (err) reject(err);
                    resolve(hash);
                });
            })
            await credential.updateOne({ user: req.user.id }, { password: hash });
            let user = await credential.findOne({user:req.user.id});
            res.send({success:true});

        }



}
module.exports={
    changePassword
}