const express = require("express");
const router = express.Router();
const passport = require("passport");
const signUp = require(__basedir + "/controllers/credential/signup");
const to = require("await-to-js").default;
const adminRouter = require("./admin").router;
const lecturerRouter = require("./lecturer");
const studentRouter = require("./student");
const coursesRouter = require("./courses");
const courseRouter = require("./course");
const CONFIG = require("../config.json");
const fs =require('fs');
// test
const getNewests = require(__basedir + "/controllers/course/get_newests");
const getTopFavorites = require(__basedir +
  "/controllers/course/get_top_favorites");
const getTopViews = require(__basedir + "/controllers/course/get_top_views");
const getTopWeeklyTrans = require(__basedir +
  "/controllers/course/get_top_weekly_transactions");
const getTopWeeklyCats = require(__basedir +
  "/controllers/subcategory/get_top_weekly_cats");
const getTopCats = require(__basedir + "/controllers/subcategory/get_top_cats");
const getRelatedCourses = require(__basedir + "/controllers/course/get_related_courses_by_catID");
const { addAdditionalFields } = require(__basedir +
  "/controllers/course/helpers");
const study = require('../controllers/student/study');
const {sendVerificationMail} = require(__basedir + "/controllers/credential/send_email");
const verifyAction = require(__basedir + "/controllers/credential/verify_action")
const middlewares = {
  isAuthenticated: require(__basedir + "/controllers/middlewares").isAuthenticated,
  isStudent: require(__basedir + "/controllers/middlewares").isStudent,
  isLecturer: require(__basedir + "/controllers/middlewares").isLecturer,
  isAdmin: require(__basedir + "/controllers/middlewares").isAdmin,
}
const jwt = require('jsonwebtoken');
const changeEmail = require('../controllers/credential/change_email').changeEmail;


// static data


/* GET home page. */
router.get("/", async (req, res) => {
  let topEnrolls = await getTopWeeklyTrans(CONFIG.nTopTrending);
  let topViews = await getTopViews(CONFIG.nTopView);
  let topFavorites = await getTopFavorites(CONFIG.nTopFavorite);
  let newests = await getNewests(CONFIG.nNewest);
  let topWeeklySubCats = await getTopWeeklyCats(CONFIG.nTopWeeklySubCat);
  let topSubCats = await getTopCats(CONFIG.nTopSubCat);

  addAdditionalFields(topEnrolls);
  addAdditionalFields(topViews);
  addAdditionalFields(topFavorites);
  addAdditionalFields(newests);

  // console.log(__categories);

  res.render("index", {
    topEnrolls,
    topViews,
    topFavorites,
    newests,
    topWeeklySubCats,
    topSubCats,
    statics:__statics,
  });
});

const test = require('../controllers/course/test');
router.get("/test", async function (req, res){
  res.send({success: await test()});
});

router.use('/student',middlewares.isAuthenticated,middlewares.isStudent ,studentRouter);

router.use("/courses", coursesRouter); // for search result

router.use("/course", courseRouter); // for one single detail course


router.use("/student", middlewares.isAuthenticated,middlewares.isStudent,studentRouter);
router.use("/lecturer", middlewares.isAuthenticated,middlewares.isLecturer, lecturerRouter);



// router.get('/course_detail_view', function (req, res, next) {
//   courseRouter.course_detail_view(req, res);
// });
//
// router.get('/create_new_course', function (req, res, next) {
//   courseRouter.create_course(req, res);
// });
router
  .route("/signin")
  .get((req, res) => {    
    if (req.isAuthenticated()) {
      res.redirect(__host);
    } else res.render("sign_in");
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/signin",
      failureFlash: true,
    }),
    (req, res) => {
      if (req.user) {
        const redirectUrl =
          __host + (req.session.redirectUrl || "/");
        console.log("after authenticate");
        console.log(redirectUrl);
        res.redirect(redirectUrl);
      }
    }
  );

router
  .route("/signup")
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.redirect(__host);
    } else res.render("sign_up");
  })
  .post(async (req, res) => {
    let err, rs;

    [err, rs] = await to(signUp(req, res));
    if (err) {
      console.log(err);
      console.log(err.debugMessage || null);
      req.flash("error", err.userMessage || null);
      res.redirect("/signup");
    }
  });

router.route("/verify/:token")
.get(async (req, res) => {  
  console.log(req.params.token)

  try {
    console.log("1");
    if (await verifyAction(req.params.token)) {
      req.flash("success", "Successfully verified registration");  
    }   
    console.log("2"); 
  }
  catch (err) {
    console.log(err);
    if (err.name == 'TokenExpiredError') {
      req.flash("error", "Token is expired. Recheck your email to get new verification link");           
    }
    else if (err.name == 'JsonWebTokenError') {
      req.flash("error", "Token is invalid");         
    }
    else {
      req.flash("error", "Something wrong happened"); 
    }
  }
  finally {
    res.redirect("/signin");
  }     
})

router.route("/changemail")
.post(async (req, res) => {
  console.log(req.body);
  let {mail, newEmail} = req.body;

  res.send({success:changeEmail(`${mail}`, `${newEmail}`)});
})

router.route("/changemail/:token")
  .get(async (req, res) => {
    console.log(req.params.token)

    try {
      console.log("1");
      if (await verifyAction(req.params.token)) {
        req.flash("success", "Successfully change email");
      }
      console.log("2");
    }
    catch (err) {
      console.log(err);
      if (err.name == 'TokenExpiredError') {
        req.flash("error", "Token is expired. Recheck your email to get new verification link");
      }
      else if (err.name == 'JsonWebTokenError') {
        req.flash("error", "Token is invalid");
      }
      else {
        req.flash("error", "Something wrong happened");
      }
    }
    finally {
      res.redirect("/");
    }
  })


router.route("/signout")
.get(middlewares.isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
})

router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  (req, res) => {
    if (req.user) {
      const redirectUrl =
        __host + (req.session.redirectUrl || "/");
      console.log("after authenticate");
      console.log(redirectUrl);
      res.redirect(redirectUrl);
    }
  }
);

router
  .route("/auth/facebook")
  .get(passport.authenticate("facebook", { scope: ["email"] }));

router.route("/auth/facebook/callback").get(
  passport.authenticate("facebook", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  (req, res) => {
    if (req.user) {
      const redirectUrl =
        __host + (req.session.redirectUrl || "/");
      console.log("after authenticate");
      console.log(redirectUrl);
      res.redirect(redirectUrl);
    }
  }
);

module.exports = router;

const admin_user_route = require("./admin_user");


router.use("/admin",middlewares.isAuthenticated, middlewares.isAdmin, adminRouter);



router.get("/upload/img/:file",(req,res)=>{


  var fileName = req.params.file;
  var store = req.params.storage;
  res.sendFile(__basedir+'/upload/img/'+fileName, function (err) {
    if (err) {
      res.send(err)
    } else {
      console.log('Sent:', fileName)
    }
  })

})
router.get("/upload/video/:file",(req,res)=>{

  var fileName = req.params.file;
  fileName=__basedir+'/upload/video/'+fileName

    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    // get video stats (about 61MB)
    const videoPath = fileName;
    const videoSize = fs.statSync(fileName).size;

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
  })



