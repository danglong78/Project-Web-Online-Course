var express = require('express');
var router = express.Router();

course_detail_view = async function (req,res) {
    res.render('course_detail_view');
}
create_course = async function (req,res) {
    res.render('create_course');
}
module.exports = {
    course_detail_view,
    create_course
}