const {
  crawledCourses,
  courseIDList,
  mainCatMap,
  subCatList,
  lecturerList,
  lecturerCourseMap,
} = require("../../generator");
const {
  getObjectId,
  randRates,
  getRndInteger,
} = require("../../helpers/index");
const faker = require("faker");
const CONFIG = require("../../../config.json");
const {courseIDList} = require("../../generator")

const courses = [];

const extractChapter = (crawl) => {
  let chapters = [];
  let c = 0;

  for (chap of crawl.curriculum.contents) {      
    let newChap = {
      _id: getObjectId(crawl.id + c),
      title: chap.title,
      duration: chap.content_length,
      durationText: chap.content_length_text,
      lecture: [],
    };

    let foundIdx = courseIDList.findIndex((course) => {
      return course.id == crawl.id
    })

    let l = 0;
    for (lec of chap.items) {
      let newLecID = craw.id + c + l;
      
      courseIDList[foundIdx].lecIDs.push(newLecID);

      let newLec = {
        _id: newLecID,
        title: lec.title,
        preview: lec.can_be_preview,
        description: lec.description,
        durationText: lec.content_summary,
        is_coding_exercise: lec.is_coding_exercise,
        file: "/upload/video/nhac1.mp4",        
      }

      newChap.lecture.push();
      l++;
    }
    chapters.push(newChap);
    c++;
  }
  return chapters;
};

const countLecture = (crawl) => {
  let count = 0;
  for (chap of crawl.curriculum.contents) {
    count += chap.lecture_count;
  }
  return count;
};

for (crawl of crawledCourses) {
  let k = 0;
  let lectureCount = countLecture(crawl);
  courseIDList.find((x) => crawl.id === x.id).lectureCount = lectureCount;

  // add category
  if (!mainCatMap.has(crawl.topics[0])) {
    mainCatMap.set(crawl.topics[0], [crawl.topics[1]]);
  } else {
    if (mainCatMap.get(crawl.topics[0]).indexOf(crawl.topics[1]) === -1) {
      mainCatMap.get(crawl.topics[0]).push(crawl.topics[1]);
    }
  }

  if (subCatList.indexOf(crawl.topics[1]) === -1) {
    subCatList.push(crawl.topics[1]);
  }

  // add course to lecturerCourseMap
  //  rand lecturer
  let randLecturer = lecturerList[getRndInteger(0, lecturerList.length - 1)];
  lecturerCourseMap.get(randLecturer).push(getObjectId(crawl.id));
  let createdAt = new Date(CONFIG.seeder.dateStart);
  createdAt.setDate(createdAt.getDate() + getRndInteger(1, 60));
  let updatedAt = new Date(createdAt);
  updatedAt.setDate(updatedAt.getDate() + getRndInteger(7, 100));

  // add course
  courses.push({
    id: getObjectId(crawl.id),
    title: crawl.title,
    short_description: crawl.headline,
    detail_description: crawl.description,
    price: crawl.price,
    fullPrice: crawl.fullPrice,
    finished: true,
    avatar: crawl.image,
    createdAt,
    updatedAt,
    lecturer: getObjectId(randLecturer),
    badge: "",
    lectureCount,
    viewCount: faker.random.number(),
    enrollCount: faker.random.number(),
    favoriteCount: faker.random.number(),
    category: getObjectId(crawl.topics[0]),
    subCategory: getObjectId(crawl.topics[1]),
    rates: randRates(),
    chapter: extractChapter(crawl),
  });
}

module.exports = courses;
