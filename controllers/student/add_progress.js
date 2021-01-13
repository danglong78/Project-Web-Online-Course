const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;

const addProgress = async (studentID, courseID, lecutureID) => {
    try {
        let student = await Student.findOne({ _id: studentID });
        if (student) {
            if (student.courses.length > 0) {
                let foundIdx = student.courses.findIndex(f => f.course == courseID);
                if (foundIdx > -1) {
                    if (student.courses[foundIdx].progress.tracked_list.findIndex(p => p.lecture == lecutureID) === -1) {
                        var temp = {
                            lecture:lecutureID,
                            finished: false,
                            checkPoint:0
                        }
                        student.courses[foundIdx].progress.tracked_list.push(temp);
                        await student.save();
                        return {success:true,progress:student.courses[foundIdx].progress};
                    }
                } else {
                    return {success:false};
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


module.exports = addProgress;







