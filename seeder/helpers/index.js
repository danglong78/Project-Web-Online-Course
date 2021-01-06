const { getObjectId, getObjectIds } = require("mongo-seeding");
const {
  courseIDList,
  studentList,
  mainCatList,
  subCatList,
} = require("../generator");
const faker = require("faker");

const mapToEntities = (names) => {
  return names.map((name) => {
    const id = getObjectId(name);

    return {
      id,
      name,
    };
  });
};

const randNumArray = (range, size) => {
  let rs = [];
  for (let i = 0; i < range; i++) {
    rs[i] = i;
  }

  // randomize the array
  rs.sort(function () {
    return Math.random() - 0.5;
  });

  return rs.slice(0, size);
};

const randCourses = (nCourses) => {
  return getObjectIds(
    randNumArray(courseIDList.length, nCourses).map(
      (idx) => courseIDList[idx].id
    )
  );
};

const joinRandCourses = (nCourses, nProgress) => {
  let courses = [];
  let randCourses = randNumArray(courseIDList.length, nCourses);

  for (let i = 0; i < defaultNumCourses; i++) {
    courses.push({
      progress: randNumArray(
        courseIDList[randCourses[i]].lectureCount,
        nProgress
      ),
      course: getObjectId(courseIDList[randCourses[i]].id),
    });
  }
  return courses;
};

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randRates = (nRates) => {
  console.log("DEBUG HERE");
  let rates = [];
  console.log(studentList);
  let randStudents = randNumArray(studentList.length, nRates);

  console.log(randStudents);
  for (let i = 0; i < randStudents.length; i++) {
    rates.push({
      student: getObjectId(studentList[randStudents[i]] + "student"),
      score: getRndInteger(0, 5),
      review: faker.lorem.text(),
    });
  }
  return rates;
};

const randMainCat = () => {
  return mainCatList[getRndInteger(0, mainCatList.length - 1)];
};

const randSubCat = () => {
  return subCatList[getRndInteger(0, subCatList.length - 1)];
};

module.exports = {
  mapToEntities,
  getObjectId,
  getObjectIds,
  randNumArray,
  randCourses,
  joinRandCourses,
  randRates,
  randMainCat,
  randSubCat,
};
