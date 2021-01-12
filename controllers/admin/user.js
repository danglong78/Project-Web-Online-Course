const stu_user = require('../../models/student').model;
const lec_user = require('../../models/lecturer').model;
const admin_user = require('../../models/admin').model;
const credential = require('../../models/credential').model;
const create_user = require('../credential/admin_user_create');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const to = require("await-to-js").default;

const user_view = async function(res){
    try {
        let user = await credential.find();
        for (var i = 0; i < user.length; i++) {
            var aUser;
            if (user[i].role == "Student") {
                aUser = await stu_user.findById(user[i].user);
                user[i]["name"] = aUser.name;
            }
            else if (user[i].role == "Lecturer") {
                aUser = await lec_user.findById(user[i].user);
                user[i]["name"] = aUser.name;
            } else {
                aUser = await admin_user.findById(user[i].user);
                user[i]["name"] = aUser.name;
            }
            console.log(i);
        }
        res.render('admin/user', { user: user, statics: __statics });
    } catch (e) {
        res.render('error');
    }
};

const del_stu = async function (req, res) {
    const id = req.body.id;
    try {
        var cre = await credential.findById(id);
        var temp = credential.findByIdAndDelete(id).exec();
        if (temp) {
            stu_user.findByIdAndDelete(cre.user).exec();
        }
    } catch (err) {
        res.send({ success: false });
    }
    res.send({ success: true });
};

const add_stu = function (req, res) {
    create_user.admin_add_student(req, res);
};

const del_lecturer = async function (req, res) {
    const id = req.body.id;
    try {
        var cre = await credential.findById(id);
        var temp = credential.findByIdAndDelete(id).exec();
        if (temp) {
            lec_user.findByIdAndDelete(cre.user).exec();
        }
    } catch (err) {
        res.send({ success: false });
    }
    res.send({ success: true });
};

const add_lec = function (req, res) {
    create_user.admin_add_lecturer(req, res);
};

const change_infor = async function (req, res) {
    const id = req.body.id;
    const new_name = req.body.name;
    const new_email = req.body.email;
    var cre = await credential.findById(id);
    var user;
    if (cre.role == "Student") {
        console.log('adfads');
        user = await stu_user.findById(cre.user);
        user.name = new_name;
        stu_user.update({ _id: user._id }, { $set: user }).exec();
    } else {
        console.log('adfadfadfadfadfadsfadsfads');
        user = await lec_user.findById(cre.user);
        user.name = new_name;
        lec_user.update({ _id: user._id }, { $set: user }).exec();
    }
    cre.email = new_email;
    credential.update({ _id: id }, { $set: cre }).exec();
    res.send({ success: true });

};

const change_pass = async function (req, res) {
    const id = req.body.id;
    const new_pass = req.body.password;
    let err, hash;
    [err, hash] = await to(bcrypt.hash(new_pass, saltRounds));
    if (err) {
        /*err.debugMessage = "Something wrong when hashing";
        err.userMessage = "Something wrong happened. Please try again!";*/
        res.send({ success: false });
    }
    var cre = await credential.findById(id);
    cre.password = hash;
    credential.update({ _id: id }, { $set: cre }).exec();
    res.send({ success: true });
};


module.exports = {
    admin_user_view: user_view,
    admin_delete_student: del_stu,
    admin_add_student: add_stu,
    admin_delete_lecture: del_lecturer,
    admin_add_lecturer: add_lec,
    admin_change_infor: change_infor,
    admin_change_pass: change_pass
}