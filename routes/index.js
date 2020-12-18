var express = require('express');
var router = express.Router();
var courseRouter = require('../routes/course');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' );
});
router.get('/index', function(req, res, next) {
  res.render('index');
});
router.get('/course_detail_view', function(req, res, next) {
  courseRouter.course_detail_view(req,res);
});
router.get('/create_new_course', function(req, res, next) {
  courseRouter.create_course(req,res);
});
module.exports = router;
