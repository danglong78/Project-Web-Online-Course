const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const rateCourse = async (studentID, courseID, score, review) => {

    try {
        let course = await Course.findOne({ _id: courseID });
        let aStu = await Student.findById(studentID);
        if(aStu){
            let index = aStu.courses.findIndex(c=>c.course == courseID);
            if(index==-1){
                return false;
            }
        }

        if (course) {
            let foundIdx = course.rates.findIndex(c => c.student == studentID);
            if (foundIdx > -1) {
                course.rates[foundIdx].score = score;
                course.rates[foundIdx].review = review;
            }
            else {
                course.rates.push({
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

const check_rated = async function(user_id,course_id){
    var aCourse = await Course.findById(course_id);
    if(aCourse==null){
        return true;
    }
    if(!aCourse.rates.some(rate => rate.student==user_id)){
        return false;
    }
    return true;
}


module.exports ={
    rateCourse,
    check_rated
}







