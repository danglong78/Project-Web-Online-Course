var express = require('express');
var cateController = require('../controllers/category/admin_category_view');

const admin_view_Cate = function (res) {
    cateController.admin_Cate_View(res);
};

module.exports = {
    View_Cate: admin_view_Cate
}