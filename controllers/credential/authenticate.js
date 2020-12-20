const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
console.log("BASE DIR" + __basedir);
const Credential = require(__basedir + '/models/credential').model;
const Student = require(__basedir + '/models/student').model;
const to = require('await-to-js').default;


// 

passport.serializeUser(function (user, done) {
    console.log("Serialize:");
    console.log(user);

    // role = "Student" || "Admin" || "Lecturer"
    done(null, { role: user.role, id: user._id });
    console.log("end serialize");
});

passport.deserializeUser(async (payload, done) => {
    console.log("Deserialize:");

    let user = {
        id: payload.id,
        role: payload.role,
    }
    done(null, user);
    console.log("end deserialize");
});

const localVerifyCb = async (req, email, password, done) => {
    console.log("In local strategy");
    let err, credential;

    [err, credential] = await to(Credential.findOne({ email: email }));

    if (err) {
        return done(err, false, req.flash('error', 'Something wrong happened. Try again!'));
    }

    if (!credential) {
        return done(null, false, req.flash('error', 'Incorrect email or password'));
    }

    if (!credential.password) {
        return done(null, false, req.flash('error', 'Incorrect email or password'));
    }

    if (!(await bcrypt.compare(password, credential.password))) {
        return done(null, false, req.flash('error', 'Incorrect email or password'));
    }

    user = {
        id: credential.user,
        role: credential.role
    }
    return done(null, user, req.flash('success', 'WELCOME TO UDEMY CLONE'));
};

const googleVerifyCb = async (req, accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    let err, credential;

    [err, credential] = await to(Credential.findOne({ googleID: profile.id }));

    if (err) {
        return done(err, false, req.flash('error', 'Something wrong happened. Try again!'));
    }

    if (credential) return done(null, { id: credential.user, role: credential.role }, req.flash('success', 'WELCOME TO UDEMY CLONE'));
    else {
        // Try to find account having the same email as this google account
        [err, credential] = await to(Credential.findOne({ email: profile.emails[0].value }));

        if (err) {
            return done(err, false, req.flash('error', 'Something wrong happened. Try again!'));
        }

        if (credential) {
            return done(null, { id: credential.user, role: credential.role }, req.flash('success', 'WELCOME TO UDEMY CLONE'));
        }
        else {  // If still not found, create a new account
            const newStudent = new Student({});
            const newCredential = new Credential({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleID: profile.id,
                role: 'Student',
                user: newStudent._id
            });

            try {
                await newStudent.save();
                await newCredential.save();

                let user = {
                    id: newStudent._id,
                    role: newCredential.role
                }

                return done(null, user, req.flash('success', 'WELCOME TO UDEMY CLONE'));
            }
            catch (err) {
                return done(err, false, req.flash('error', 'Something wrong happened. Try again!'));
            }
        }
    }
};

// const facebookVerifyCb = async (req, accessToken, refreshToken, profile, done) => {
//     // console.log(profile);
//     User.findOne({ facebookID: profile.id }, async function (err, user) {
//         if (err) {
//             return done(err, false, req.flash('error', 'Something wrong happened. Try again!'));
//         }

//         if (user) return done(null, user, req.flash('success', 'Welcome to EzTest'));
//         else {
//             const newUser = new User({
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 password: profile.password || "",
//                 facebookID: profile.id
//             });

//             try {
//                 await newUser.save();
//                 return done(null, newUser, req.flash('success', 'Welcome to EzTest'));
//             }
//             catch (e) {
//                 return done(e, false);
//             }
//         };
//     }
//     )
// };

localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, localVerifyCb);

googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, googleVerifyCb);

// facebookStrategy = new FacebookStrategy({
//     clientID: "750118305860704",
//     clientSecret: "c1cf6bc4928796e2e8d55df2c8ed5660",
//     callbackURL: "http://localhost:3000/login/auth/facebook/callback",
//     passReqToCallback: true,
//     profileFields: ['id', 'emails', "displayName"],
// }, facebookVerifyCb);

module.exports.passportSetup = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(localStrategy);
    passport.use(googleStrategy);
    // passport.use(facebookStrategy);
}