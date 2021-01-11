const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const getCourses = async function(studentID){
    try {
        let student = await Student.findOne({ _id: studentID }).populate('courses.course').lean();

        if (student) {
            if (student.courses.length > 0) {
                //console.log(student.courses);
                return student.courses;
            }
        }
        return null;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = getCourses;