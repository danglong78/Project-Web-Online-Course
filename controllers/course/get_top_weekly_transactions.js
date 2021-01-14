const Student = require("../../models/student").model;
const Course = require("../../models/course").model;
const Lecturer = require("../../models/lecturer").model;
const SubCategory = require("../../models/subCategory").model;
const MainCategory = require("../../models/category").model;
const WeeklyTransaction = require("../../models/weekly_transaction").model;

const getTopWeeklyTrans = async (n) => {
  let topWeekTrans = [];

  try {
    topWeeklyTrans = await WeeklyTransaction.aggregate([
      {
        $group: {
          _id: "$course",
          count: { $sum: 1 },
        },
      },

      {
        $sort: {
          count: -1,
        },
      },

      {
        $limit: n,
      },
    ]);

    // console.log(topWeeklyTrans);

    topWeeklyTrans = await WeeklyTransaction.populate(topWeeklyTrans, {
      path: "_id",
      model: "Course",
      populate: [
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
      ],
      // populate: {
      //   path: "category",
      //   model: "MainCategory",
      // },
      // populate: {
      //   path: "subCategory",
      //   model: "SubCategory",
      // },
    });

    // const opts = [
    //   { path: "_id", model: "Course" },
    //   { path: "notes", options: { limit: 10 }, model: "override" },
    // ];

    let courses = [];
    for (course of topWeeklyTrans) {
      let courseObj = course._id.toObject();
      // course._id.weekCount = course.count;
      courseObj.weekCount = course.count;
      // console.log(courseObj);
      // console.log(course._id);
      courses.push(courseObj);
    }

    topWeekTrans = courses;
    // console.log(topweeklyTrans);
  } catch (err) {
    console.log(err);
  }
  return topWeekTrans;
};

module.exports = getTopWeeklyTrans;
