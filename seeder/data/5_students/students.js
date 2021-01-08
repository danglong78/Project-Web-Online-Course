const { studentList } = require("../../generator");
const {
  getObjectId,
  randCourses,
  joinRandCourses,
  randDateAfter,
} = require("../../helpers/index");
const CONFIG = require("../../../config.json");
const transactions = require("../8_transactions/transactions");
const faker = require("faker");

const students = [];

for (let i = 0; i < studentList.length; i++) {
  let joinCourses = joinRandCourses(
    CONFIG.seeder.nStudentCourse,
    CONFIG.seeder.nProgress
  );

  let randDates = randDateAfter(CONFIG.seeder.dateStart, joinCourses.length);
  for (let j = 0; j < joinCourses.length; j++) {
    transactions.push({
      date: randDates[j],
      course: joinCourses[j].course,
      student: getObjectId(studentList[i]),
    });
  }

  students.push({
    id: getObjectId(studentList[i]),
    name: faker.name.findName(),
    courses: joinCourses,
    favorites: randCourses(CONFIG.seeder.nFavorite),
  });
}

module.exports = students;
