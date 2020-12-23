const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const deleteFavorite = async (studentID, courseID) => {
    try {
        let student = await Student.findOne({ _id: studentID });

        if (student) {
            if (student.favorites.length > 0) {
                let foundIdx = student.favorites.findIndex(f => f === courseID);
                if (foundIdx > -1) {
                    // Delete favorite
                    student.favorites.splice(foundIdx, 1);
                    await student.save();

                    // Decrease favorites count of this course
                    let course = await Course.findOne({ _id: courseID });
                    course.favoriteCount--;
                    await course.save();

                    return true;
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


module.exports = deleteFavorite;







