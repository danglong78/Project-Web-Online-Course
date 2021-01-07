const { crawledCourses, courseIDList } = require("../../generator");
const {
  getObjectId,
  randRates,
  randMainCat,
  randSubCat,
} = require("../../helpers/index");
const faker = require("faker");

const courses = [];

const extractChapter = (crawl, k) => {
  let chapters = [];

  for (chap of crawl.curriculum.contents) {
    let newChap = {
      title: chap.title,
      duration: chap.content_length,
      lecture: [],
    };

    for (lec of chap.items) {
      newChap.lecture.push({
        title: lec.title,
        preview: lec.can_be_preview,
        content: lec.description,
        file: lec.learn_url,
        index: k,
      });
      k++;
    }
    chapters.push(newChap);
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

  courses.push({
    id: getObjectId(crawl.id),
    title: crawl.title,
    short_description: crawl.headline,
    detail_description: crawl.description,
    price: crawl.price,
    finished: true,
    avatar: crawl.image,
    lecturer: getObjectId(crawl.authors),
    lectureCount,
    viewCount: faker.random.number(),
    enrollCount: faker.random.number(),
    favoriteCount: faker.random.number(),
    category: getObjectId(randMainCat()),
    subCategory: getObjectId(randSubCat()),
    rates: randRates(5),
    chapter: extractChapter(crawl, k),
  });
}

module.exports = courses;
