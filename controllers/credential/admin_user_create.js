const Credential = require(__basedir + "/models/credential").model;
const Student = require(__basedir + "/models/student").model;
const Lecturer = require(__basedir + "/models/lecturer").model;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const to = require("await-to-js").default;

const isUniqueEmail = async function (email) {
    let err, credential;

    [err, credential] = await to(Credential.findOne({ email }));
    if (credential) {
        return false;
    }
    return true;
};

const add_student = async (req, res) => {
    console.log("Sign up");
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!(await isUniqueEmail(email))) {
        let err = new Error();
        err.debugMessage = "Signup: Duplicated email";
        err.userMessage = "This email has already been used for registration";
        throw err;
    }

    let err, hash;
    [err, hash] = await to(bcrypt.hash(password, saltRounds));
    if (err) {
        /*err.debugMessage = "Something wrong when hashing";
        err.userMessage = "Something wrong happened. Please try again!";*/
        res.send({ success: false, _id: 'abcxyz' });
    }

    const newStudent = new Student({ name });
    const newCredential = new Credential({
        email,
        password: hash,
        user: newStudent._id,
        role: "Student",
    });

    try {
        await newStudent.save();
        await newCredential.save();
        /*await req.login({ id: newStudent._id, role: newCredential.role }, (err) => {
            err.debugMessage = "Something wrong when logging in user";
            err.userMessage = "Something wrong happened. Please try again!";
        });

        req.flash("success", "WELCOME TO UDEMY CLONE");
        let redirectUrl = req.session.redirectUrl || "http://localhost:3000";*/
        return res.send({ success: true, _id: newCredential._id });
    } catch (err) {
        err.debugMessage = "Something wrong when saving user";
        err.userMessage = "Something wrong happened. Please try again!";
        res.send({ success: false, _id: 'abcxyz' });
    } finally {
        console.log("end signup");
    }
};

const add_lecturer = async (req, res) => {
    console.log("Sign up");
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!(await isUniqueEmail(email))) {
        let err = new Error();
        err.debugMessage = "Signup: Duplicated email";
        err.userMessage = "This email has already been used for registration";
        throw err;
    }

    let err, hash;
    [err, hash] = await to(bcrypt.hash(password, saltRounds));
    if (err) {
        /*err.debugMessage = "Something wrong when hashing";
        err.userMessage = "Something wrong happened. Please try again!";*/
        res.send({ success: false, _id: 'abcxyz' });
    }

    const newLecturer = new Lecturer({ name: name });
    const newCredential = new Credential({
        email,
        password: hash,
        user: newLecturer._id,
        role: "Lecturer",
    });

    try {
        await newLecturer.save();
        await newCredential.save();
        /*await req.login({ id: newStudent._id, role: newCredential.role }, (err) => {
            err.debugMessage = "Something wrong when logging in user";
            err.userMessage = "Something wrong happened. Please try again!";
        });

        req.flash("success", "WELCOME TO UDEMY CLONE");
        let redirectUrl = req.session.redirectUrl || "http://localhost:3000";*/
        return res.send({ success: true, _id: newCredential._id });
    } catch (err) {
        err.debugMessage = "Something wrong when saving user";
        err.userMessage = "Something wrong happened. Please try again!";
        res.send({ success: false, _id: 'abcxyz' });
    } finally {
        console.log("end signup");
    }
};


module.exports = {
    admin_add_student: add_student,
    admin_add_lecturer: add_lecturer
}
