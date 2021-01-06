const { lecturerList } = require("../../generator");
const { getObjectId, randCourses } = require("../../helpers/index");
const faker = require("faker");

const lecturers = [];

for (let j = 0; j < lecturerList.length; j++) {
  lecturers.push({
    id: getObjectId(emailList[j]),
    shortDescbibe: faker.lorem.text,
    detailDescribe: faker.lorem.sentences,
    courses: randCourses(1),
  });
}

module.exports = lecturers;
