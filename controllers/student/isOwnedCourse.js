const Student = require("../../models/student").model;


const Owned_Check = async (stu_id,course_id)=>{
    try {
        let student = await Student.findOne({ _id: stu_id });
        if (student) {
            if (student.courses.length > 0) {
                if (!student.courses.some(f => f.course == course_id)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        else {
            return false;
        }

    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const Favorite_check = async(stu_id,course_id)=>{
    try {
        let student = await Student.findOne({ _id: stu_id });

        if (student) {
            if (student.courses.length > 0) {
                if (!student.favorites.some(f => f == course_id)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        else {
            return false;
        }

    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    Owned_check : Owned_Check,
    Favorite_Check : Favorite_check
}

