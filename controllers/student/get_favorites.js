const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const getFavorites = async (studentID) => {
    try {
        let student = await Student.findOne({ _id: studentID }).populate('favorites').lean();

        if (student) {
            if (student.favorites.length > 0) {
                return student.favorites;
            }
        }
        return null;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = getFavorites;