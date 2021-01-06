const { studentList, courseIDList } = require("../../generator");
const {
  getObjectId,
  randCourses,
  joinRandCourses,
} = require("../../helpers/index");
const CONFIG = require("../../config.json");

const students = [];

for (let i = 0; i < studentList.length; i++) {
  students.push({
    id: getObjectId(studentList[i]),
    courses: joinRandCourses(CONFIG.nStudentCourse, CONFIG.nProgress),
    favorites: randCourses(CONFIG.nFavorite),
  });
}

module.exports = students;
