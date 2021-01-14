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
        let user = await credential.findWithDeleted().lean();
        for (var i = 0; i < user.length; i++) {
            var aUser;
            if (user[i].role == "Student") {
                try{
                    aUser = await stu_user.findOneWithDeleted({ _id: user[i].user });
                }
                catch(err){
                    console.log(err);
                }
                user[i]["name"] = aUser.name;
                console.log(user[i]);
            }
            else if (user[i].role == "Lecturer") {
                try{
                    aUser = await lec_user.findOneWithDeleted({ _id: user[i].user });
                }
                catch(err){
                    console.log(err);
                }
                user[i]["name"] = aUser.name;
                console.log(user[i]);
            } else {
                aUser = await admin_user.findById(user[i].user);
                user[i]["name"] = aUser.name;
                console.log(user[i]);
            }
        }
        res.render('admin/user', { user: user, statics: __statics });
    } catch (err) {
        console.log(err);
        res.render('error');
    }
};

const del_stu = async function (req, res) {
    const id = req.body.id;
    try {
        var temp = await credential.findOne({_id:id});
        if (temp) {
            temp.delete();
            var aStudent = await stu_user.findOne({_id:temp.user});
            if (aStudent){
                aStudent.delete();
            }
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
        var temp = await credential.findOne({ _id: id });
        if (temp) {
            temp.delete();
            var aLecturer = await lec_user.findOne({_id:temp.user});
            if (aLecturer) {
                aLecturer.delete();
            }
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
    var cre = await credential.findOne({_id:id});
    var user;
    if (cre.role == "Student") {
        user = await stu_user.findOne({_id:cre.user});
        user.name = new_name;
        stu_user.updateOne({ _id: user._id }, { $set: user }).exec();
    } else {
        user = await lec_user.findOne({_id:cre.user});
        user.name = new_name;
        lec_user.updateOne({ _id: user._id }, { $set: user }).exec();
    }
    cre.email = new_email;

    credential.updateOne({ _id: id }, { $set: cre }).exec();
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
    var cre = await credential.findOne({_id:id});
    cre.password = hash;
    credential.updateOne({ _id: id }, { $set: cre }).exec();
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