const express = require('express');
const router = express.Router();
const courseRouter = require('../routes/course');
const passport = require('passport');
const signUp = require(__basedir + '/controllers/credential/signup');
const to = require('await-to-js').default;
const adminRouter = require('./admin');
const cateRouter = require('./category');
const lecturerRouter = require('./lecturer')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.use('/lecturer',lecturerRouter)
// router.get('/course_detail_view', function (req, res, next) {
//   courseRouter.course_detail_view(req, res);
// });
//
// router.get('/create_new_course', function (req, res, next) {
//   courseRouter.create_course(req, res);
// });
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

module.exports = router;


router.get('/lecture_detail', function (req, res) {
  res.render('lecture_detail');
});

router.get('/my_course', function (req, res) {
  res.render('student_mycourse');
});

router.get('/admin_cate', function (req, res) {
  adminRouter.View_Cate(res);
});
router.get('/admin_course', function (req, res) {
  adminRouter.View_Course(res);
});


router.post('/category/editCate', function (req, res, next) {
  cateRouter.Cate_Rename(req, res);
});

router.post('/category/addMainCate', function (req, res, next) {
    cateRouter.MainCate_Add(req,res);
});
router.post('/category/delSubCate', function (req, res, next) {
    console.log(req.body)
    res.send({success:true})
});
router.post('/category/delMainCate', function (req, res, next) {
    console.log(req.body)
    res.send({success:true})
});
router.post('/category/addSubCateToMainCate', function (req, res, next) {
    console.log(req.body)
    res.send({success:true})
});
router.post('/category/changeSubCateToMainCate', function (req, res, next) {
    console.log(req.body)
    res.send({success:true})
});
router.post('/category/editSubCateName', function (req, res, next) {
    console.log(req.body)
    res.send({success:true})
});router.post('/category/addSubCate', function (req, res, next) {
    console.log(req.body)
    res.send({success:false})
});
router.post('/course/delCourse', async function (req, res, next) {
    try
    {
        await quizModel.deleteOne({ _id: id });
        res.send({success:true})

    }catch (e)
    {
        res.send({success:true})
    }
});
