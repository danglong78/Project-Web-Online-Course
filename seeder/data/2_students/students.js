const { emailList, nStudent, courseIDList } = require("../generator");
const {
  getObjectId,
  randCourses,
  joinRandCourses,
} = require("../../helpers/index");

const students = [];

for (let i = 0; i < nStudent; i++) {
  students.push({
    id: getObjectId(emailList[i]),
    courses: joinRandCourses(2, 5),
    favorites: randCourses(2),
  });
}

module.exports = students;
