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