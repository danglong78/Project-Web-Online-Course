var express = require('express');
var mongoose = require('mongoose');
var cateModel = require('../models/category').model;
var courseModel = require('../models/course').model;

const rename_Cate = async function (req, res) {
    const id = req.body.id;
    const new_name = req.body.name;
    var aCate = await cateModel.findById(id);
    aCate.name = new_name;
    cateModel.update({ _id: id }, { $set: aCate }).exec();
    res.send({ success: true });
};


const add_Cate = async function (req, res) {
    var temp = await cateModel.find({ name: req.body.name });
    var aCate = await cateModel.findById(req.body.id);
    if (temp.length > 0) {
        res.send({ success: false });
    }
    else {
        const new_cate = new cateModel({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            subCate: []
        });
        new_cate.save();
        var subid = new_cate._id;
        aCate.subCate.push(subid);
        cateModel.update({ _id: req.body.id }, { $set: aCate }).exec();
        res.send({ success: true });
    }

}


const del_Cate = async function (req, res) {
    var temp = await cateModel.find({ name: req.body.name });
    var aCate = await cateModel.findById(req.body.id);
}
module.exports = {
    Cate_Rename: rename_Cate,
    Cate_Add: add_Cate
}