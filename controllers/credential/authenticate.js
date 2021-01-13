const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcrypt");
console.log("BASE DIR" + __basedir);
const Credential = require(__basedir + "/models/credential").model;
const Student = require(__basedir + "/models/student").model;
const to = require("await-to-js").default;

//

passport.serializeUser(function (user, done) {
  console.log("Serialize:");
  console.log(user);

  // role = "Student" || "Admin" || "Lecturer"
  done(null, { role: user.role, id: user.id, name: user.name });
  console.log("end serialize");
});

passport.deserializeUser(async (payload, done) => {
  console.log("Deserialize:");

  let user = {
    id: payload.id,
    role: payload.role,
    name: payload.name,
  };
  done(null, user);
  console.log(user);
  console.log("end deserialize");
});

const localVerifyCb = async (req, email, password, done) => {
  console.log("In local strategy");
  let err, credential;

  [err, credential] = await to(Credential.findOne({ email: email }).populate("user"));

  if (err) {
    return done(
      err,
      false,
      req.flash("error", "Something wrong happened. Try again!")
    );
  }

  if (!credential) {
    return done(null, false, req.flash("error", "Incorrect email or password"));
  }

  if (!credential.password) {
    return done(null, false, req.flash("error", "Incorrect email or password"));
  }

  if (!credential.isVerified) {    
    return done(null, false, req.flash("error", "Account has not been verified yet"));
  }

  if (!(await bcrypt.compare(password, credential.password))) {
    return done(null, false, req.flash("error", "Incorrect email or password"));
  }

  user = {
    id: credential.user._id,
    role: credential.role,
    name: credential.user.name
  };
  return done(null, user, req.flash("success", "WELCOME TO UDEMY CLONE"));
};

const googleVerifyCb = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  // console.log(profile);
  let err, credential;

  [err, credential] = await to(Credential.findOne({ googleID: profile.id }).populate("user"));

  if (err) {
    return done(
      err,
      false,
      req.flash("error", "Something wrong happened. Try again!")
    );
  }

  if (credential)
    return done(
      null,
      { id: credential.user._id, role: credential.role, name: credential.user.name},
      req.flash("success", "WELCOME TO UDEMY CLONE")
    );
  else {
    // Try to find account having the same email as this google account
    [err, credential] = await to(
      Credential.findOne({ email: profile.emails[0].value }).populate("user")
    );

    if (err) {
      return done(
        err,
        false,
        req.flash("error", "Something wrong happened. Try again!")
      );
    }

    if (credential) {
      return done(
        null,
        { id: credential.user._id, role: credential.role, name: credential.user.name},
        req.flash("success", "WELCOME TO UDEMY CLONE")
      );
    } else {
      // If still not found, create a new account
      const newStudent = new Student({ name: profile.displayName });
      const newCredential = new Credential({
        email: profile.emails[0].value,
        googleID: profile.id,
        role: "Student",
        user: newStudent._id,
      });

      try {
        await newStudent.save();
        await newCredential.save();

        let user = {
          id: newStudent._id,
          role: newCredential.role,
          name: newStudent.name,
        };

        return done(null, user, req.flash("success", "WELCOME TO UDEMY CLONE"));
      } catch (err) {
        return done(
          err,
          false,
          req.flash("error", "Something wrong happened. Try again!")
        );
      }
    }
  }
};

const facebookVerifyCb = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  // console.log(profile);
  let err, credential;

  [err, credential] = await to(Credential.findOne({ googleID: profile.id }).populate("user"));

  if (err) {
    return done(
      err,
      false,
      req.flash("error", "Something wrong happened. Try again!")
    );
  }

  if (credential)
    return done(
      null,
      { id: credential.user._id, role: credential.role, name: credential.name},
      req.flash("success", "WELCOME TO UDEMY CLONE")
    );
  else {
    // Try to find account having the same email as this google account
    [err, credential] = await to(
      Credential.findOne({ email: profile.emails[0].value }).populate("user")
    );

    if (err) {
      return done(
        err,
        false,
        req.flash("error", "Something wrong happened. Try again!")
      );
    }

    if (credential) {
      return done(
        null,
        { id: credential.user._id, role: credential.role },
        req.flash("success", "WELCOME TO UDEMY CLONE")
      );
    } else {
      // If still not found, create a new account
      const newStudent = new Student({ name: profile.displayName });
      const newCredential = new Credential({
        email: profile.emails[0].value,
        facebookID: profile.id,
        role: "Student",
        user: newStudent._id,
      });

      try {
        await newStudent.save();
        await newCredential.save();

        let user = {
          id: newStudent._id,
          role: newCredential.role,
          name: newStudent.name
        };

        return done(null, user, req.flash("success", "WELCOME TO UDEMY CLONE"));
      } catch (err) {
        return done(
          err,
          false,
          req.flash("error", "Something wrong happened. Try again!")
        );
      }
    }
  }
};

localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  localVerifyCb
);

googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
  },
  googleVerifyCb
);

facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    passReqToCallback: true,
    profileFields: ["id", "emails", "displayName"],
  },
  facebookVerifyCb
);

module.exports.passportSetup = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(localStrategy);
  passport.use(googleStrategy);
  passport.use(facebookStrategy);
};
