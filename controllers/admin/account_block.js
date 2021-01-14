var credentialModel = require('../../models/credential').model;
const Student = require('../../models/student').model;
const Lecturer = require('../../models/lecturer').model

const block_user = async function (req, res) {
    const id = req.body.id;
    console.log(id)
    let aUser = await credentialModel.findOne({ _id: id });
    if (aUser == null) {
        res.send({ success: false });
    } else {
        aUser.delete();

        if (aUser.role === "Student") {
            let aStudent = await Student.findOne({ _id: aUser.user });
            if (aStudent) {
                aStudent.delete();
            }

        }
        else if (aUser.role === "Lecturer") {
            let aLecturer = await Lecturer.findOne({ _id: aUser.user });
            if (aLecturer) {
                aLecturer.delete();
            }
        }
        res.send({ success: true });
    }
}

const unblock_user = async function (req, res) {
    const id = req.body.id;
    var aUser = await credentialModel.findOneDeleted({ _id: id });
    if (aUser == null) {
        res.send({ success: false });
    } else {
        aUser.restore();

        if (aUser.role === "Student") {
            let aStudent = await Student.findOneDeleted({ _id: aUser.user });
            if (aStudent) {
                aStudent.restore();
            }

        }
        else if (aUser.role === "Lecturer") {
            let aLecturer = await Lecturer.findOneDeleted({ _id: aUser.user });
            if (aLecturer) {
                aLecturer.restore();
            }
        }

        res.send({ success: true });
    }
}

module.exports = {
    User_blocked: block_user,
    User_unblocked: unblock_user
}