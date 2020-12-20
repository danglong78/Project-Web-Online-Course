const Credential = require(__basedir + '/models/credential').model;
const Student = require(__basedir + '/models/student').model;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const to = require('await-to-js').default;


const isUniqueEmail = async function (email) {
    let err, credential;

    [err, credential] = await to(Credential.findOne({ email }));
    if (credential) {
        return false;
    }
    return true;
}

module.exports = async (req, res) => {
    console.log("Sign up")
    console.log(req.body);

    const { name, email, password } = req.body;

    if (!(await isUniqueEmail(email))) {
        throw new Error({
            userMessage: 'This email has already been used for registration'
        });
    }

    let err, hash;
    [err, hash] = await to(bcrypt.hash(password, saltRounds));
    if (err) {
        err.debugMessage = 'Something wrong when hashing';
        err.userMessage = 'Something wrong happened. Please try again!';
        throw err;
    }

    const newStudent = new Student({});
    const newCredential = new Credential({ name, email, password: hash, user: newStudent._id, role: 'Student' });

    try {
        await newStudent.save();
        await newCredential.save();
        await req.login({ id: newStudent._id, role: newCredential.role }, (err) => {
            err.debugMessage = 'Something wrong when logging in user';
            err.userMessage = 'Something wrong happened. Please try again!';
        });

        req.flash("success", "WELCOME TO UDEMY CLONE");
        let redirectUrl = req.session.redirectUrl || "http://localhost:3000";
        return res.redirect(redirectUrl);
    }
    catch (err) {
        err.debugMessage = 'Something wrong when saving user';
        err.userMessage = 'Something wrong happened. Please try again!';
        throw err;
    } finally {
        console.log("end signup");
    }
}