const jwt = require('jsonwebtoken');
const Credential = require(__basedir + '/models/credential').model;
const {sendVerificationMail} = require(__basedir + '/controllers/credential/send_email');



const verifyRegistration = async (token) => {
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
                
                            
        credential = await Credential.findOne({email: payload.email});  
        console.log(credential);
        if (credential) {
            credential.isVerified = true;
            credential.save();  
            return true;
        }
        else throw new Error('Account not found');
    }
    catch (err) {        
        if (err.name === "TokenExpiredError") {
            payload = jwt.decode(token); 
            console.log(payload);            

            const newToken = jwt.sign(
                {
                    email: payload.email,
                },
                process.env.VERIMAIL_SECRECT,
                { expiresIn: 60 }
              );

            sendVerificationMail(payload.email, `${__host}/verify/${newToken}`);
        }                      
        throw err; 
    }
}

module.exports = verifyRegistration;