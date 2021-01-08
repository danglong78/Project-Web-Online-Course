const { lecturerList, lecturerCourseMap } = require("../../generator");
const { getObjectId } = require("../../helpers/index");
const faker = require("faker");

const lecturers = [];

for (let j = 0; j < lecturerList.length; j++) {
  lecturers.push({
    id: getObjectId(lecturerList[j]),
    name: faker.name.findName(),
    shortDescbibe: faker.lorem.text(),
    detailDescribe: faker.lorem.sentences(),
    courses: lecturerCourseMap.get(lecturerList[j]),
  });
}

module.exports = lecturers;
