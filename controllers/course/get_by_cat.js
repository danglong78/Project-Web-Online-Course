const mongoosePaginate = require("mongoose-paginate-v2");
const Course = require(__basedir + "/models/course").model;
const SubCategory = require(__basedir + "/models/subCategory").model;

const getByCategory = async (catName, page, limit) => {
  console.log(catName);
  const options = {
    page,
    limit,
    sort: { enrollCount: -1 },
    lean: true,
  };

  let courses = [];
  try {
    const foundCat = await SubCategory.findOne({ name: catName }).lean();
    if (foundCat) {
      console.log("found cat");
      const query = { subCategory: foundCat._id };

      courses = await new Promise((resolve, reject) => {
        Course.paginate(query, options, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });

      console.log(courses);
    }
  } catch (e) {
    console.log(err);
  }
  return courses;
};

module.exports = getByCategory;
