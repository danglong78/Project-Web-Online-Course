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

  for (let i = 0; i < nCourses; i++) {
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
  let rates = [];
  let randStudents = randNumArray(studentList.length, nRates);

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

const randSubCats = (nSubCats) => {
  return getObjectIds(
    randNumArray(subCatList.length, nSubCats).map((idx) => subCatList[idx])
  );
};

const randDateAfter = (stringDate, n) => {
  let aDate = new Date(stringDate);

  let diffDays = diffDaysBetween(aDate, new Date(Date.now()));
  let dateIncrement = randNumArray(diffDays, n);
  let dates = [];

  for (let increment of dateIncrement) {
    let date = new Date(aDate);
    date.setDate(date.getDate() + increment);
    dates.push(date);
  }
  return dates;
};

const diffDaysBetween = (date1, date2) => {
  return Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
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
  randSubCats,
  randDateAfter,
};
