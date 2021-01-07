var express = require('express');
var mongoose = require('mongoose');
var cat_controller = require("../controllers/category/admin_category_view");
const router = express.Router();


router.post('/editCate', function (req, res, next) {
    cat_controller.admin_rename_Main_cate(req, res);
});

router.post('/addMainCate', function (req, res, next) {
    cat_controller.admin_add_Main_cate(req, res);
});


router.post('/delSubCate', function (req, res, next) {
    console.log("ahkjdfhadsf");
    console.log(req.body)
    res.send({ success: true });
});
router.post('/delSubCateFromMainCate', function (req, res, next) {
    console.log("123");
    console.log(req.body)
    res.send({ success: true });
});


router.post('/delMainCate', function (req, res, next) {
    cat_controller.admin_del_Main_cate(req, res);
});


router.post('/addSubCateToMainCate', function (req, res, next) {
    cat_controller.admin_add_Subcate_to_Maincate(req, res);
});


router.post('/changeSubCateToMainCate', function (req, res, next) {
    console.log(req.body);
    res.send({ success: true });
});


router.post('/editSubCateName', function (req, res, next) {
    cat_controller.admin_rename_Sub_cate(req, res);
});


router.post('/addSubCate', function (req, res, next) {
    cat_controller.admin_add_Sub_cate(req, res);
});

module.exports = router;
