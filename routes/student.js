const express = require("express");
const router = express.Router();
const addFavorite = require("../controllers/student/add_favorite");
const getFavorites = require("../controllers/student/get_favorites");
const deleteFavorite = require("../controllers/student/delete_favorite");
const getCourses = require("../controllers/student/get_courses");
const addProgress = require("../controllers/student/add_progress");
const rateCourse = require("../controllers/student/rate_course");
const isJoinedIn = require("../controllers/middlewares").isJoinedIn;
const isAuthenticated = require('../controllers/middlewares').isAuthenticated;
const accountSetting = require('../controllers/student/profileSetting')
const changePassword =require('../controllers/credential/changepassword').changePassword
const credentialModel = require('../models/credential').model
const studentModel = require('../models/student').model


router.get("/",isAuthenticated, async function (req, res) {
  // Student's profile
    let credential = await  credentialModel.findOne({user:req.user.id})
    let student =  await  studentModel.findOne({_id:req.user.id})
    res.render("student/setting",{statics:__statics,student,credential})
})
router.post("/",isAuthenticated, function (req,res) {
  accountSetting(req,res)
});
router.post("/changePassword",isAuthenticated, function (req,res) {
  changePassword(req,res)
})
router.route("/favorites/add").post(async (req, res) => {
  let { courseID } = req.body;

  if (await addFavorite(req.user.id, courseID)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.route("/favorites").get(async (req, res) => {
  let favorites = await getFavorites(req.user.id);
  res.render("/student/favorites", { favorites });
});

router.route("/favorites/delete").post(async (req, res) => {
  let { courseID } = req.body;

  if (await deleteFavorite(req.user.id, courseID)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});


router.route("/courses").get( isAuthenticated,async (req, res) => {
  let courses = await getCourses(req.user.id);
  res.render("/student/myCourse", { courses });
});

router.route("/join").post(async (req, res) => {
  let { courseID } = req.body;

  if (await joinCourse(req.user.id, courseID)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.route("/learn/:courseID").get(isAuthenticated,isJoinedIn, (req, res) => {

  res.render("lecture_detail", { course });
});

router.route("/progress/add").post(isJoinedIn, async (req, res) => {
  let { courseID, section } = req.body;

  if (await addProgress(req.user.id, courseID, section)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.route("/progress/delete").post(isJoinedIn, async (req, res) => {
  let { courseID, section } = req.body;

  if (await deleteProgress(req.user.id, courseID, section)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.route("/rate").post(isJoinedIn, async (req, res) => {
  let { courseID, section } = req.body;

  if (await rateCourse(req.user.id, courseID, section)) {
    //
  } else {
    //
  }
});

module.exports = router;
