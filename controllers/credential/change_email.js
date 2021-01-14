const { sendVerificationMail } = require(__basedir + '/controllers/credential/send_email');
const jwt = require('jsonwebtoken');


const changeEmail = (email, newEmail) => {
    
    try {
        let token = jwt.sign(
            {
                email,
                newEmail,
                action: "changemail"
            },
            process.env.VERIMAIL_SECRECT,
            { expiresIn: 60 }
        );

        sendVerificationMail(email, `${__host}/changemail/${token}`, "changemail");
        console.log("Change email sent");
        return true;
    }
    catch (e) {
        throw e;
    }
}


module.exports = {
    changeEmail
}