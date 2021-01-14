var express = require('express');
var mongoose = require('mongoose');
var cat_controller = require("../controllers/category/admin_category_view");
const router = express.Router();

router.get("/",async function (req, res) {
    await cat_controller.admin_Cate_View(res)
});


router.post('/editCate', function (req, res, next) {
    cat_controller.admin_rename_Main_cate(req, res);
});

router.post('/addMainCate', function (req, res, next) {
    console.log(req.body)
    cat_controller.admin_add_Main_cate(req, res);
});


router.post('/delSubCate', function (req, res, next) {
    cat_controller.admin_del_Subcate(req, res);
});
router.post('/delSubCateFromMainCate', function (req, res, next) {
    cat_controller.admin_del_subcate_from_maincate(req, res);
});


router.post('/delMainCate', function (req, res, next) {
    cat_controller.admin_del_Main_cate(req, res);
});


router.post('/addSubCateToMainCate', function (req, res, next) {
    cat_controller.admin_add_Subcate_to_Maincate(req, res);
});


router.post('/changeSubCateToMainCate', function (req, res, next) {
    cat_controller.admim_change_subcate(req, res);
});


router.post('/editSubCateName', function (req, res, next) {
    cat_controller.admin_rename_Sub_cate(req, res);
});


router.post('/addSubCate', async function (req, res, next) {
    await cat_controller.admin_add_Sub_cate(req, res);
});

module.exports = router;
