const Student = require(__basedir + "/models/student").model;
const Course = require(__basedir + "/models/course").model;

const getTopViews = async (n) => {
  let topViews;
  try {
    topViews = await Course.find()
      .populate([
        {
          path: "lecturer",
          model: "Lecturer",
          options: { withDeleted: true }
        },
        {
          path: "category",
          model: "MainCategory",
          options: { withDeleted: true }
        },
        {
          path: "subCategory",
          model: "SubCategory",
          options: { withDeleted: true }
        },
      ])
      .lean()
      .sort({ viewCount: -1 })
      .limit(n);
    return topViews;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = getTopViews;
