const mongoosePaginate = require("mongoose-paginate-v2");
const Course = require(__basedir + "/models/course").model;
const SubCategory = require(__basedir + "/models/subCategory").model;

const getByCategory = async (catName, page, limit) => {
  // console.log(catName);
  const options = {
    page,
    limit,
    sort: { enrollCount: -1 },
    lean: true,
  };

  let paginates;
  try {
    const foundCat = await SubCategory.findOne({ name: catName }).lean();
    if (foundCat) {
      // console.log("found cat");
      const query = { subCategory: foundCat._id };

      paginates = await new Promise((resolve, reject) => {
        Course.paginate(query, options, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });

      paginates.docs = await Course.populate(paginates.docs, [
        {
          path: "lecturer",
          model: "Lecturer",
        },
        {
          path: "category",
          model: "MainCategory",
        },
        {
          path: "subCategory",
          model: "SubCategory",
        },
      ]);

      if (paginates.totalDocs > 0) {
        paginates.catName = paginates.docs[0].subCategory.name;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return paginates;
};

module.exports = getByCategory;
