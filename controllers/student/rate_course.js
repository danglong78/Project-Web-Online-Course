const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const rateCourse = async (studentID, courseID, score, review) => {

    try {
        let course = await Course.findOne({ _id: courseID });

        if (course) {
            let foundIdx = course.rates.findIndex(c => c.student === studentID);
            if (foundIdx > -1) {
                courses.rates[foundIdx].score = score;
                courses.rates[foundIdx].review = review;
            }
            else {
                courses.rates.push({
                    student: studentID,
                    score,
                    review
                })
            }
            await course.save();
            return true;
        }
        return false;

    }
    catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = rateCourse;







