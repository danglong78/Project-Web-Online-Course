var express = require('express');
var mongoose = require('mongoose');
var user_controller = require("../controllers/admin/user");
const banUser = require('../controllers/admin/account_block').User_blocked;
const unbanUser = require('../controllers/admin/account_block').User_unblocked;
const router = express.Router();

router.get("/", async function  (req, res) {
   await  user_controller.admin_user_view(res);
});

router.post("/addLecturer", function (req, res) {
    user_controller.admin_add_lecturer(req, res);
});
router.post("/banUser", async function (req, res) {
    await banUser(req, res);
});
router.post("/openUser", async function (req, res) {
    await unbanUser(req, res);
});
router.post("/changePassword", function (req, res) {
    user_controller.admin_change_pass(req, res);
});
router.post("/changeInfor", function (req, res) {
    user_controller.admin_change_infor(req, res);
});

module.exports = router;