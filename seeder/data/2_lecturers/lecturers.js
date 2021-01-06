const { lecturerList } = require("../../generator");
const { getObjectId, randCourses } = require("../../helpers/index");
const faker = require("faker");
const CONFIG = require("../../config.json");

const lecturers = [];

for (let j = 0; j < lecturerList.length; j++) {
  lecturers.push({
    id: getObjectId(lecturerList[j]),
    shortDescbibe: faker.lorem.text(),
    detailDescribe: faker.lorem.sentences(),
    courses: randCourses(CONFIG.nLecturerCourse),
  });
}

module.exports = lecturers;
