const Student = require(__basedir + "/models/student").model;
const Course = require(__basedir + "/models/course").model;

const getNewests = async (n) => {
  let newest = [];
  try {
    newest = await Course.find().lean().sort({ createdAt: -1 }).limit(n);
  } catch (err) {
    console.log(err);
  }
  return newest;
};

module.exports = getNewests;
