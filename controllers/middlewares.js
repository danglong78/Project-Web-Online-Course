const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;


module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You are not logged in right now. Please login first.');
        req.session.redirectUrl = req.originalUrl;
        console.log("In authenticated");
        console.log(req.originalUrl);
        res.redirect("http://localhost:3000/signin");
        console.log("end authenticated")
    }
}

// Need to check isAuthenticated first so that req.user exists
module.exports.isJoinedIn = async (req, res, next) => {
    const studentID = req.user.id;
    const courseID = req.body.courseID || req.params.courseID || "0";

    try {
        let student = await Student.findOne({ _id: studentID });

        if (student) {
            if (student.courses.length > 0) {
                if (student.courses.some(f => f.course == courseID)) {
                    next();
                }
                else {
                    res.redirect(__host);
                }
            }
        }
        else {
            let err = new Error();
            err.message = "Error in isJoinedIn middleware: Current student is not found";
            err.userMessage = "Something wrong happened. Please try again!";
            next(err);
        }

    }
    catch (err) {
        console.log(err);
        next(err);
    }
}