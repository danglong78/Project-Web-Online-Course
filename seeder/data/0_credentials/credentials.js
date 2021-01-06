const { studentList, lecturerList } = require("../generator");
const { getObjectId } = require("../../helpers/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const faker = require("faker");
const defaultPw = "123";
const defaultHash = bcrypt.hashSync(defaultPw, saltRounds);
const credentials = [];

for (let i = 0; i < studentList.length; i++) {
  credentials.push({
    id: getObjectId(studentList[i] + "student"),
    name: faker.name.findName(),
    email: studentList[i],
    password: defaultHash,
    role: "Student",
    user: getObjectId(studentList[i]),
  });
}

for (let j = 0; j < lecturerList.length; j++) {
  credentials.push({
    id: getObjectId(lecturerList[j] + "lecturer"),
    name: faker.name.findName(),
    email: lecturerList[j],
    password: defaultHash,
    role: "Lecturer",
    user: getObjectId(lecturerList[j]),
  });
}

module.exports = credentials;
