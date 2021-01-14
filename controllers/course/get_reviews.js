const Course = require(__basedir + "/models/course").model;
const CONFIG = require(__basedir + "/config.json");




const getReviews = async (courseID, nLeftReview) => {
    let revs = [];

    try {
        let course = await Course.findOne({_id: courseID}).lean();
        console.log(course);

        if (course) {
            revs = course.rates.slice(course.rates.length - nLeftReview, course.rates.length - nLeftReview + CONFIG.nReview);     
            course.rates.slice()       
        }
        console.log(revs);
    }
    catch (err) {
        console.error(err);    
    }
    finally {
        return revs;
    }
}


module.exports = {
    getReviews
}