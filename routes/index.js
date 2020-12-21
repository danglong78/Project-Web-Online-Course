const express = require('express');
const router = express.Router();
const courseRouter = require('../routes/course');
const passport = require('passport');
const signUp = require(__basedir + '/controllers/credential/signup');
const to = require('await-to-js').default;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/course_detail_view', function (req, res, next) {
  courseRouter.course_detail_view(req, res);
});

router.get('/create_new_course', function (req, res, next) {
  courseRouter.create_course(req, res);
});

router.route('/signin')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("http://localhost:3000");
    }
    else
      res.render('sign_in');
  })
  .post(passport.authenticate('local', { failureRedirect: "/signin", failureFlash: true }), (req, res) => {
    if (req.user) {
      const redirectUrl = "http://localhost:3000" + (req.session.redirectUrl || "/");
      console.log("after authenticate");
      console.log(redirectUrl);
      res.redirect(redirectUrl);
    }
  });

router.route('/signup')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("http://localhost:3000");
    }
    else
      res.render('sign_up');
  })
  .post(async (req, res) => {
    let err, rs;

    [err, rs] = await to(signUp(req, res));
    if (err) {
      console.log(err);
      console.log(err.debugMessage || null);
      req.flash('error', err.userMessage || null);
      res.redirect('/signup');
    }
  });


router.route('/auth/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/auth/google/callback')
  .get(passport.authenticate('google', { failureRedirect: "/signin", failureFlash: true }), (req, res) => {
    if (req.user) {
      const redirectUrl = "http://localhost:3000" + (req.session.redirectUrl || "/");
      console.log("after authenticate");
      console.log(redirectUrl);
      res.redirect(redirectUrl);
    }
  });

router.route('/auth/facebook')
  .get(passport.authenticate('facebook', { scope: ['email'] }));

router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', { failureRedirect: "/signin", failureFlash: true }), (req, res) => {
    if (req.user) {
      const redirectUrl = "http://localhost:3000" + (req.session.redirectUrl || "/");
      console.log("after authenticate");
      console.log(redirectUrl);
      res.redirect(redirectUrl);
    }
  });
router.post('/create_new_course', function (req, res, next) {
    courseRouter.receive_infor(req, res);
});
router.post('/create_new_course1', function (req, res, next) {
    courseRouter.receive_img(req, res);
});



module.exports = router;


router.get('/lecture_detail', function (req, res) {
  res.render('lecture_detail');
});

router.get('/my_course', function (req, res) {
  res.render('student_mycourse');
});