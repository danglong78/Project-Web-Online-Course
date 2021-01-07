const { studentList, courseIDList } = require("../../generator");
const {
  getObjectId,
  randCourses,
  joinRandCourses,
} = require("../../helpers/index");
const CONFIG = require("../../../config.json");
const transactions = require("../1_transaction/transactions");

const students = [];

for (let i = 0; i < studentList.length; i++) {
  let randCourses = joinRandCourses(
    CONFIG.seeder.nStudentCourse,
    CONFIG.seeder.nProgress
  );

  students.push({
    id: getObjectId(studentList[i]),
    courses: randCourses,
    favorites: randCourses(CONFIG.seeder.nFavorite),
  });
}

module.exports = students;
