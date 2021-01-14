// const mongoosePaginate = require("mongoose-paginate-v2");
const Course = require(__basedir + "/models/course").model;
const SubCategory = require(__basedir + "/models/subCategory").model;

const getByCatID = async (catID, page, limit, sortBy) => {
  // console.log(catID);
    
  let paginates;
  // let aggregate;

  try {
    if (catID.length != 24) {
      return;
    }

    const foundCat = await SubCategory.findOne({ _id: catID }).lean();
    if (!foundCat._id) {
      return;
    }
    else {
      // console.log("found cat");

      const options = {
        page,
        limit,    
        lean: true,
      };

      let agg = [
        {
          $match: {
            subCategory: foundCat._id,
          },
        },
        {
          $addFields: {
            avgRate: {
              $avg: "$rates.score",
            },
          },
        },      
      ];

      if (sortBy === "rate") {
        agg.push({ $sort: {avgRate: -1, _id: 1 }});
      }
      else if (sortBy === "price") {
        agg.push({ $sort: {price: 1, _id: 1 }});
      }
      else {
        agg.push({ $sort: {enrollCount: -1, _id: 1 }});
      }

      let aggregate = Course.aggregate(agg);

      paginates = await new Promise((resolve, reject) => {
        Course.aggregatePaginate(aggregate, options, (err, result) => {
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
