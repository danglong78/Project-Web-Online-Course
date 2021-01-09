const Course = require(__basedir + "/models/course").model;
const SubCategory = require(__basedir + "/models/subCategory").model;
const MainCategory = require("../../models/category").model;

const fullTextSearch = async (key, catName, page, limit) => {
  let paginates = [];
  if (!key) {
    key = "";
  }

  if (!catName) {
    catName = "";
  }

  try {
    const options = {
      page,
      limit,      
      // projection: { score: { $meta: "textScore" } },
      // sort: { score: { $meta: "textScore" } },
    };

    if (catName) {
      const foundCat = await SubCategory.findOne({ name: catName }).lean();

      if (foundCat) {
        const query = {
          $and: [{ $text: { $search: key } }, { subCategory: foundCat._id }],
        };

        paginates = await new Promise((resolve, reject) => {
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
      // console.log("DEBUG");
      const query = { $text: { $search: key } };
      paginates = await new Promise((resolve, reject) => {
        Course.paginate(query, options, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });                
    }

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
  } catch (err) {
    console.log(err);
  } finally {
    return paginates;
  }
};

module.exports = fullTextSearch;
