const Student = require("../../models/student").model;
const Course = require("../../models/course").model;
const Lecturer = require("../../models/lecturer").model;
const SubCategory = require("../../models/subCategory").model;
const MainCategory = require("../../models/category").model;
const Transaction = require("../../models/transaction").model;

const getTopCats = async (n) => {
  let topCats = [];

  try {
    // .populate({
    //   path: "course",
    //   model: "Course",
    // })
    // .group({
    //   _id: "$subCategory",
    //   count: { $sum: 1 },
    // });

    topCats = await Transaction.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "courseDetail",
        },
      },
      {
        $group: {
          _id: "$courseDetail.subCategory",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "_id",
          as: "subCatDetail",
        },
      },
      {
        $project: {
          _id: 0,
          subCat: {
            $arrayElemAt: ["$subCatDetail", 0],
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$subCat",
        },
      },
      {
        $limit: n,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
  return topCats;
};

module.exports = getTopCats;
