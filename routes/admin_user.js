var express = require('express');
var mongoose = require('mongoose');
var user_controller = require("../controllers/admin/user");
const router = express.Router();

router.get("/", function (req, res) {
    user_controller.admin_user_view(res);
});

router.post("/addStudent", function (req, res) {
    user_controller.admin_add_student(req, res);
});
router.post("/delStudent", function (req, res) {
    user_controller.admin_delete_student(req, res);
});
router.post("/addLecturer", function (req, res) {
    user_controller.admin_add_lecturer(req, res);
});
router.post("/delLecturer", function (req, res) {
    user_controller.admin_delete_lecture(req, res);
});
router.post("/changePassword", function (req, res) {
    user_controller.admin_change_pass(req, res);
});
router.post("/changeInfor", function (req, res) {
    user_controller.admin_change_infor(req, res);
});

module.exports = router;