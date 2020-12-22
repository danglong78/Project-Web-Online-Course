const Student = require(__basedir + '/models/student').model;
const Course = require(__basedir + '/models/course').model;


const getTopViews = async (n) => {
    let topViews;
    try {
        topViews = await Course.find().sort({ viewCount: -1 }).limit(n);
        return topViews;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = getTopViews;