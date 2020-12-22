const Student = require(__basedir + 'models/student').model;
const Course = require(__basedir + 'models/course').model;

const deleteProgress = async (studentID, courseID, section) => {
    try {
        let student = await Student.findOne({ _id: studentID });

        if (student) {
            if (student.courses.length > 0) {
                let foundIdx = student.courses.findIndex(f => f.course === courseID);
                if (foundIdx > -1) {
                    let foundSectionIdx = student.courses[foundIdx].progress.findIndex(p => p === section)
                    if (foundSectionIdx > -1) {
                        student.courses[foundIdx].progress.splice(foundSectionIdx, 1);
                        await student.save();
                        return true;
                    };
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


module.exports = deleteProgress;







