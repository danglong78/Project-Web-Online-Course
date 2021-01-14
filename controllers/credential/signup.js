const Credential = require(__basedir + "/models/credential").model;
const Student = require(__basedir + "/models/student").model;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const to = require("await-to-js").default;
const jwt = require('jsonwebtoken');
const {sendVerificationMail} = require('./send_email');


const isUniqueEmail = async function (email) {
  let err, credential;

  [err, credential] = await to(Credential.findOne({ email }));
  if (credential) {
    return false;
  }
  return true;
};

module.exports = async (req, res) => {
  console.log("Sign up");
  console.log(req.body);

  const { name, email, password } = req.body;

  if (!(await isUniqueEmail(email))) {
    let err = new Error();
    err.debugMessage = "Signup: Duplicated email";
    err.userMessage = "This email has already been used for registration";
    throw err;
  }

  let err, hash;
  [err, hash] = await to(bcrypt.hash(password, saltRounds));
  if (err) {
    err.debugMessage = "Something wrong when hashing";
    err.userMessage = "Something wrong happened. Please try again!";
    throw err;
  }

  const newStudent = new Student({ name });
  const newCredential = new Credential({
    email,
    password: hash,
    user: newStudent._id,
    role: "Student",
    isVerified: false
  });

  try {
    await newStudent.save();
    await newCredential.save();

    // send verification email
    // const privateKey = process.env.VERIMAIL_SECRECT;
    let token = jwt.sign(
      {
        email,
        action: "res"
      },
      process.env.VERIMAIL_SECRECT,
      { expiresIn: 60 }
    ); 
    
    sendVerificationMail(email, `${__host}/verify/${token}`, "res");
    req.flash('success', "Please check your email for account activation link");
    return res.redirect("/signin");

    // await req.login({ id: newStudent._id, role: newCredential.role, name: newStudent.name}, (err) => {
    //   err.debugMessage = "Something wrong when logging in user";
    //   err.userMessage = "Something wrong happened. Please try again!";
    // });

    // req.flash("success", "WELCOME TO UDEMY CLONE");
    // let redirectUrl = req.session.redirectUrl || "http://localhost:3000";
    // return res.redirect(redirectUrl);
  } catch (err) {
    err.debugMessage = "Something wrong when saving user";
    err.userMessage = "Something wrong happened. Please try again!";
    throw err;
  } finally {
    console.log("end signup");
  }
};
