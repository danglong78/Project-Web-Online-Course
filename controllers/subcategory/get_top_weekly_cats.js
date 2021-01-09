const Student = require("../../models/student").model;
const Course = require("../../models/course").model;
const Lecturer = require("../../models/lecturer").model;
const SubCategory = require("../../models/subCategory").model;
const MainCategory = require("../../models/category").model;
const WeeklyTransaction = require("../../models/weekly_transaction").model;

const getTopWeeklyCats = async (n) => {
  let topWeeklyCats = [];

  try {
    topWeeklyCats = await WeeklyTransaction.find();
    // .populate({
    //   path: "course",
    //   model: "Course",
    // })
    // .group({
    //   _id: "$subCategory",
    //   count: { $sum: 1 },
    // });

    topWeeklyCats = await WeeklyTransaction.aggregate([
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
  return topWeeklyCats;
};

module.exports = getTopWeeklyCats;
