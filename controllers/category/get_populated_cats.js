const SubCategory = require("../../models/subCategory").model;
const MainCategory = require("../../models/category").model;

const getPopulatedCats = async () => {
  let cats = [];

  try {
    // .populate({
    //   path: "course",
    //   model: "Course",
    // })
    // .group({
    //   _id: "$subCategory",
    //   count: { $sum: 1 },
    // });

    cats = await MainCategory.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "subCate",
          foreignField: "_id",
          as: "subDetail",
        },
      },
      {
        $project: {
          subCate: 0,
        },
      },
    ]);
  } catch (err) {
    console.log(err);
  }
  return cats;
};

module.exports = getPopulatedCats;

// return {
//   _id,
//   name,
//   subDetail: [{ 
//     _id,
//     name
//   }]
// }
