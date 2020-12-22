const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const joinCourse = async (studentID, courseID) => {
    try {
        let student = await Student.findOne({ _id: studentID });

        if (student) {
            let course = await Course.findOne({ _id: courseID }).lean();
            if (course) {
                if (!student.courses.some(f => f.course === courseID)) {
                    student.courses.push({ progress: [], course: courseID });
                    await student.save();
                }
                return true;
            }
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = joinCourse;







