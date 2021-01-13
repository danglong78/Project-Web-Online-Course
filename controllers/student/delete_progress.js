const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const deleteProgress = async (studentID, courseID, lectureID) => {
    try {
        let student = await Student.findOne({ _id: studentID });

        if (student) {
            if (student.courses.length > 0) {
                let foundIdx = student.courses.findIndex(f => f.course == courseID);
                if (foundIdx > -1) {
                    let index = student.courses[foundIdx].progress.findIndex(p => p == lectureID)
                    if (index > -1) {
                        student.courses[foundIdx].progress.splice(index, 1);
                        await student.save();
                        return {success:true,progress:student.courses[foundIdx].progress};
                    };
                }
            }
        }
        return {success:false};

    }
    catch (err) {
        console.log(err);
        return {success:false};
    }
}


module.exports = deleteProgress;







