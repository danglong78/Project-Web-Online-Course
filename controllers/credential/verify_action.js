const jwt = require('jsonwebtoken');
const Credential = require(__basedir + '/models/credential').model;
const {sendVerificationMail} = require(__basedir + '/controllers/credential/send_email');



const verifyAction = async (token) => {
    let payload;
    try {
        // const payload = await new Promise((resolve, reject) => {
        //   jwt.verify(
        //     token,
        //     process.env.VERIMAIL_SECRECT,
        //     function (err, decoded) {
        //       if (err) reject(err);
        //       resolve(decoded);
        //     }
        //   );
        // });

        payload = jwt.verify(token, process.env.VERIMAIL_SECRECT);
        console.log(payload);
        let credential = await Credential.findOne({ email: payload.email });
        console.log(credential);
        if (payload.action === "res") {
            
            if (credential) {
                credential.isVerified = true;
                await credential.save();
                return true;
            }
            else throw new Error('Account not found');
        }
        else if (payload.action === "changemail") {
            
            if (credential) {
                credential.email = payload.newEmail;
                await credential.save();
                return true;
            }
            else throw new Error('Account not found');
        }
                            
        
    }
    catch (err) {        
        if (err.name === "TokenExpiredError") {
            payload = jwt.decode(token); 
            console.log(payload);            
            let newToken;

            if (payload.action === "res") {

                newToken = jwt.sign(
                    {
                        email: payload.email,
                        action: "res"
                    },
                    process.env.VERIMAIL_SECRECT,
                    { expiresIn: 60 }
                );

                sendVerificationMail(payload.email, `${__host}/verify/${newToken}`, "res");
            }
            else if (payload.action === "changemail") {

                newToken = jwt.sign(
                    {
                        email: payload.email,
                        action: "changemail"
                    },
                    process.env.VERIMAIL_SECRECT,
                    { expiresIn: 60 }
                );

                sendVerificationMail(payload.email, `${__host}/verify/${newToken}`, "changemail");
            }
            

            
        }                      
        throw err; 
    }
}

module.exports = verifyAction;