const express = require("express");
const router = express.Router();
const addFavorite = require("../controllers/student/add_favorite");
const getFavorites = require("../controllers/student/get_favorites");
const deleteFavorite = require("../controllers/student/delete_favorite");
const getCourses = require("../controllers/student/get_courses");
const addProgress = require("../controllers/student/add_progress");
const rateCourse = require("../controllers/student/rate_course");
const isJoinedIn = require("../controllers/middlewares").isJoinedIn;

router.route("/").get(function (req, res) {
  // Student's profile
});

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
  res.render("student/favorites", { favorites, statics: __statics });
});

router.route("/favorites/delete").post(async (req, res) => {
  let { courseID } = req.body;

  if (await deleteFavorite(req.user.id, courseID)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.route("/courses").get(async (req, res) => {
  let courses = await getCourses(req.user.id);

  console.log(course);
  res.render("student/courses", { courses, statics: __statics});
});

router.route("/join").post(async (req, res) => {
  let { courseID } = req.body;

  if (await joinCourse(req.user.id, courseID)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.route("/learn/:courseID").get(isJoinedIn, (req, res) => {  
  res.render("learn", { course, statics: __statics });
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
