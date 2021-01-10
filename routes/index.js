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
const { addAdditionalFields } = require(__basedir +
  "/controllers/course/helpers");

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
    cats: __categories,
  });
});

router.get("/test", async function (req, res, next) {
  // let courses = await getTopViews(5);
  // let courses = await getByCategory("Cassandra", 4, 2);
  // let courses = await fullTextSearch("ultimate", "", 1, 5);
  // let courses = await getNewests(CONFIG.nNewest);
  let courses = await getTopWeeklyCats(CONFIG.nTopTrending);

  console.log("before");
  console.log(courses);
  console.log("after");
  res.json(courses);
});

router.use("/courses", coursesRouter); // for search result

router.use("/course", courseRouter); // for one single detail course

router.use("/lecturer", lecturerRouter);
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

router.get("/lecture_detail", function (req, res) {
  res.render("lecture_detail");
});

router.get("/my_course", function (req, res) {
  res.render("student_mycourse");
});

router.get("/admin_cate", function (req, res) {
  adminRouter.View_Cate(res);
});
router.get("/admin_course", function (req, res) {
  adminRouter.View_Course(res);
});
router.get("/admin_user", function (req, res) {
  adminRouter.View_User(res);
});

router.use("/category", cateRouter);
const admin_user_route = require("./admin_user");
router.use("/admin", admin_user_route);

router.get("/upload/:storage/:file",(req,res)=>{


  var fileName = req.params.file;
  var store = req.params.storage;
  res.sendFile(__basedir+'/upload/'+store+'/'+fileName, function (err) {
    if (err) {
      res.send(err)
    } else {
      console.log('Sent:', fileName)
    }
  })

})