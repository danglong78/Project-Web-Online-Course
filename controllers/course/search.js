const Course = require(__basedir + "/models/course").model;
const SubCategory = require(__basedir + "/models/subCategory").model;

const fullTextSearch = async (key, catName, page, limit) => {
  let courses = [];
  try {
    const options = {
      page,
      limit,
      lean: true,
      projection: { score: { $meta: "textScore" } },
      sort: { score: { $meta: "textScore" } },
    };

    if (catName) {
      const foundCat = await SubCategory.findOne({ name: catName }).lean();

      if (foundCat) {
        const query = {
          $and: [{ $text: { $search: key } }, { subCategory: foundCat._id }],
        };

        courses = await new Promise((resolve, reject) => {
          Course.paginate(query, options, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        });
      }
    } else {
      // find with only keyword
      console.log("DEBUG");
      const query = { $text: { $search: key } };
      courses = await new Promise((resolve, reject) => {
        Course.paginate(query, options, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });

      //   console.log(courses);
    }
  } catch (err) {
    console.log(err);
  } finally {
    return courses;
  }
};

module.exports = fullTextSearch;
