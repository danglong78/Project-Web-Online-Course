const Student = require( '../models/student').model;
const Course = require( '../models/course').model;


const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You are not logged in right now. Please login first.');
        req.session.redirectUrl = req.originalUrl;
        console.log("In authenticated");
        console.log(req.originalUrl);
        res.redirect(__host + "/signin");
        console.log("end authenticated")
    }
}

// Need to check isAuthenticated first so that req.user exists
const isJoinedIn = async (req, res, next) => {
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

const isAdmin =  (req, res, next) => {
    console.log("admin middle ware");
    if (req.user == undefined) {
        console.log("undefined");
        req.flash('error', 'You do not have permission.');
        res.redirect(__host);

    }
    else if (req.user.role === 'Admin') {
        console.log("is admin");
         next();
        
    }

    else {
        console.log("else");
        req.flash('error', 'You do not have permission.');
        res.redirect(__host);
    }
}

const isLecturer =  (req, res, next) => {
    if (req.user==undefined){
        req.flash('error', 'You do not have permission.');
        res.redirect(__host);

    }
    else if (req.user.role === 'Lecturer') {
        next();

    }
    else
    {
        req.flash('error', 'You do not have permission.');
        res.redirect(__host);
    }
}

const isStudent =  (req, res, next) => {
    if (req.user == undefined) {
        req.flash('error', 'You do not have permission.');
        res.redirect(__host);

    }
    else if (req.user.role === 'Student') {
        next();

    }
    else
    {
        req.flash('error', 'You do not have permission.');
        res.redirect(__host);
    }
}

module.exports = {
    isAuthenticated,
    isJoinedIn,
    isAdmin,
    isLecturer,
    isStudent
}