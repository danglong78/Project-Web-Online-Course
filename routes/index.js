const express = require("express");
const router = express.Router();
const passport = require("passport");
const signUp = require(__basedir + "/controllers/credential/signup");
const to = require("await-to-js").default;
const adminRouter = require("./admin");
const cateRouter = require("./category");
const lecturerRouter = require("./lecturer");
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

const test = require('../controllers/middlewares');
router.get("/test", async function (req, res, next) {
  await test.isAdmin(req,res,req);
});

router.use("/courses", coursesRouter); // for search result

router.use("/course", courseRouter); // for one single detail course

router.use("/lecturer", test.isLecturer, lecturerRouter);
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
      res.redirect("http://localhost:3000");
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
          "http://localhost:3000" + (req.session.redirectUrl || "/");
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
      res.redirect("http://localhost:3000");
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

router.route("/signout")
.get((req, res) => {
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
        "http://localhost:3000" + (req.session.redirectUrl || "/");
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
        "http://localhost:3000" + (req.session.redirectUrl || "/");
      console.log("after authenticate");
      console.log(redirectUrl);
      res.redirect(redirectUrl);
    }
  }
);

module.exports = router;

router.get("/learn/:id", test.isStudent, function (req, res) {

  study.getCourse(req,res)
});

router.get("/my_course", test.isStudent, function (req, res) {
  res.render("student_mycourse");
});


router.get("/admin_course", test.isAdmin, function (req, res) {
  adminRouter.View_Course(res);
});
router.get("/admin_user", test.isAdmin, function (req, res) {
  adminRouter.View_User(res);
});


const admin_user_route = require("./admin_user");
router.use("/admin", test.isAdmin, admin_user_route);

router.get("/upload/img/:file", test.isLecturer,(req,res)=>{


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
router.get("/upload/video/:file", test.isLecturer,(req,res)=>{

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



