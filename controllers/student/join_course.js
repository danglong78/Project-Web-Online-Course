const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;
const Transaction = require(__basedir + '/models/transaction').model;
const WeeklyTransaction = require(__basedir + '/models/weekly_transaction').model;

const joinCourse = async (studentID, courseID) => {
    try {
        let foundStudent = await Student.findOne({ _id: studentID });

        if (foundStudent) {
            let foundCourse = await Course.findOne({ _id: courseID });
            if (foundCourse) {
                if (!foundStudent.courses.some(f => f.course == courseID)) {
                    await Transaction.create({
                        date: new Date(Date.now()),
                        student: foundStudent._id,
                        course: foundCourse._id
                    });

                    await WeeklyTransaction.create({
                        date: new Date(Date.now()),
                        student: foundStudent._id,
                        course: foundCourse._id
                    });

                    foundStudent.courses.push({ progress: [], course: courseID });
                    await foundStudent.save();

                    foundCourse.enrollCount++;
                    await foundCourse.save();

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


module.exports = joinCourse;







