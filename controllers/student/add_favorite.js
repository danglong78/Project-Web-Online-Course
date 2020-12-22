const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const addFavorite = async (studentID, courseID) => {
    try {
        let student = await Student.findOne({ _id: studentID });

        if (student) {
            let course = await Course.findOne({ _id: courseID }).lean();
            if (course) {
                if (student.favorites.some(f => f === courseID)) {
                    student.favorites.push(courseID);
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


module.exports = addFavorite;







