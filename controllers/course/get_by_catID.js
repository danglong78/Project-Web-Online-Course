const mongoosePaginate = require("mongoose-paginate-v2");
const Course = require(__basedir + "/models/course").model;
const SubCategory = require(__basedir + "/models/subCategory").model;

const getByCatID = async (catID, page, limit) => {
  // console.log(catID);
  const options = {
    page,
    limit,
    sort: { enrollCount: -1 },
    lean: true,
  };

  let paginates;
  try {
    if (catID.length != 24) {
      return;
    }

    const foundCat = await SubCategory.findOne({ _id: catID }).lean();
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
        paginates.catID = paginates.docs[0].subCategory._id;        
      }
    } 

    // console.log(paginates);
  } catch (e) {
    console.log(e);
  }
  finally {
    return paginates;
  }
};

module.exports = getByCatID;
