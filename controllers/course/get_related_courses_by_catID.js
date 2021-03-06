// const mongoosePaginate = require("mongoose-paginate-v2");
const Course = require(__basedir + "/models/course").model;
const SubCategory = require(__basedir + "/models/subCategory").model;

const getRelatedCourses = async (catID, limit) => {
  // console.log(catID);
//   const options = {
//     page,
//     limit,
//     sort: { enrollCount: -1 },
//     lean: true,
//   };

  let courses;
  try {
    if (catID.length != 24) {
      return;
    }

    const foundCat = await SubCategory.findOne({ _id: catID }).lean();
    if (foundCat) {
      // console.log("found cat");
      courses = await Course.find({subCategory: foundCat._id}).sort({enrollCount:-1}).limit(limit).lean();

      courses.docs = await Course.populate(courses, [
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
    } 

    // console.log(paginates);
  } catch (e) {
    console.log(e);
  }
  finally {
    return courses;
  }
};

module.exports = getRelatedCourses;
