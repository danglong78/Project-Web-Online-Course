const Student = require(__basedir + "/models/student").model;
const Course = require(__basedir + "/models/course").model;

const getNewests = async (n) => {
  let newest;
  try {
    newest = await Course.find().lean().sort({ _id: -1 }).limit(n);
    return newest;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = getNewests;
