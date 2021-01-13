const express = require("express");
const router = express.Router();
const addFavorite = require("../controllers/student/add_favorite");
const getFavorites = require("../controllers/student/get_favorites");
const deleteFavorite = require("../controllers/student/delete_favorite");
const getCourses = require("../controllers/student/get_courses");
const addProgress = require("../controllers/student/add_progress");
const deleteProgress =require('../controllers/student/delete_progress')
const rateCourse = require("../controllers/student/rate_course");
const isJoinedIn = require("../controllers/middlewares").isJoinedIn;
const accountSetting = require('../controllers/student/profileSetting')
const changePassword =require('../controllers/credential/changepassword').changePassword
const credentialModel = require('../models/credential').model
const studentModel = require('../models/student').model
const study = require('../controllers/student/study');


router.get("/", async function (req, res) {
  // Student's profile
    let credential = await  credentialModel.findOne({user:req.user.id})
    let student =  await  studentModel.findOne({_id:req.user.id})
    res.render("student/setting",{statics:__statics,student,credential})
})
router.post("/", function (req,res) {
  accountSetting(req,res)
});
router.post("/changePassword", function (req,res) {
  changePassword(req,res)
})
router.route("/favorites/add/:id").post(async (req, res) => {
  let  courseID  = req.params.id;

  if (await addFavorite(`${req.user.id}`,`${courseID}`)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.route("/favorites/delete").post(async (req, res) => {
  let  courseID  = req.body.id;

  if (await deleteFavorite(`${req.user.id}`, `${courseID}`)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});


router.route("/courses").get( async (req, res) => {
  let courses = await getCourses(`${req.user.id}`);
  let favorites = await  getFavorites(`${req.user.id}`);
  res.render("student/myCourse", { courses,favorites,statics:__statics });
});

router.route("/join").post(async (req, res) => {
  let { courseID } = req.body;

  if (await joinCourse(`${req.user.id}`, `${courseID}`) ) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.route("/learn/:id").get(isJoinedIn, (req, res) => {

  study.getCourse(req,res)
});

router.route("/progress/add").post(isJoinedIn, async (req, res) => {
  let { id, section } = req.body;

  let rs =await addProgress(`${req.user.id}`, `${id}`, `${section}`)
  if (rs.success) {
    res.json({ success: true,progress:rs.progress.length });
  } else {
    res.json({ success: false });
  }
});

router.route("/progress/delete").post(isJoinedIn, async (req, res) => {
  let { id, section } = req.body;
  let rs =await deleteProgress(`${req.user.id}`, `${id}`, `${section}`)

  if (rs.success) {
    res.json({ success: true,progress:rs.progress.length });
  } else {
    res.json({ success: false });
  }
});

router.post("/rate",isJoinedIn, async (req, res) => {
  let { id, score,review } = req.body;
  console.log("RATING COURSE");
  if (await rateCourse.rateCourse(`${req.user.id}`, `${id}`,`${score}`, `${review}` )) {
    res.send({success:true})
  } else {
    res.send({success:false})
  }
});

module.exports = router;
