const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const addProgress = async (studentID, courseID, lecutureID) => {
    try {
        let student = await Student.findOne({ _id: studentID });
        console.log(student);
        if (student) {
            if (student.courses.length > 0) {
                let foundIdx = student.courses.findIndex(f => f.course == courseID);
                console.log(foundIdx);
                if (foundIdx > -1) {
                    if (student.courses[foundIdx].progress.findIndex(p => p == lecutureID) === -1) {
                        student.courses[foundIdx].progress.push(lecutureID);
                        student.save().exec();
                        return true;
                    }
                } else {
                    return false;
                }
            }
        }
        return false;

    }
    catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = addProgress;







