const Student = require(__basedir + "/models/student").model;
const Course = require(__basedir + "/models/course").model;

const getTopFavorites = async (n) => {
  let topFavorites;
  try {
    topFavorites = await Course.find()
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
      .sort({ favoriteCount: -1 })
      .limit(n);

    return topFavorites;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = getTopFavorites;
