const { studentList, lecturerList, adminList } = require("../../generator");
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
    email: studentList[i],
    password: defaultHash,
    role: "Student",
    user: getObjectId(studentList[i]),
    isVerified: true
  });
}

for (let j = 0; j < lecturerList.length; j++) {
  credentials.push({
    id: getObjectId(lecturerList[j] + "lecturer"),
    email: lecturerList[j],
    password: defaultHash,
    role: "Lecturer",
    user: getObjectId(lecturerList[j]),
    isVerified: true
  });
}

for (let k = 0; k < adminList.length; k++) {
  credentials.push({
    id: getObjectId(adminList[k] + "admin"),
    email: adminList[k],
    password: defaultHash,
    role: "Admin",
    user: getObjectId(adminList[k]),
    isVerified: true
  });
}

module.exports = credentials;
