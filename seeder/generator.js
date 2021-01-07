const UdemyCrawler = require("./crawler");
const faker = require("faker");
const CONFIG = require("../config.json");

const courseUrls = [
  "https://www.udemy.com/course/startup-business-development-guide/",
  "https://www.udemy.com/course/amazo-quickstart-amazon-amazing-selling-machine-alternative/",
  "https://www.udemy.com/course/introduction-to-networking-quick-course/",
  "https://www.udemy.com/course/mongoosejs-essentials/",
  "https://www.udemy.com/course/cold-call-university-course-101-introduction/",
  "https://www.udemy.com/course/ultimate-child-sleep-solutions-from-the-sleep-nanny-baby-children/",
  "https://www.udemy.com/course/devtools-2017-the-basics-of-chrome-developer-tools/",
  "https://www.udemy.com/course/docker-mastery/",
  "https://www.udemy.com/course/nodejs-the-complete-guide/",
  "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c02/",
  "https://www.udemy.com/course/the-ultimate-guide-to-game-development-with-unity/",
  "https://www.udemy.com/course/the-complete-react-native-and-redux-course/",
  "https://www.udemy.com/course/wifi-hacking-penetration-testing-from-scratch/",
  "https://www.udemy.com/course/create-a-twitter-clone-with-nodejs-socketio-and-mongodb/",
  "https://www.udemy.com/course/understand-nodejs/",
  "https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/",
  "https://www.udemy.com/course/the-complete-sql-bootcamp/",
  "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
  "https://www.udemy.com/course/advanced-javascript-concepts/",
  "https://www.udemy.com/course/microservices-with-node-js-and-react/",
  "https://www.udemy.com/course/graphql-with-react-course/",
  "https://www.udemy.com/course/learn-devops-the-complete-kubernetes-course/",
  "https://www.udemy.com/course/unreal-engine-4-blueprints/",
  "https://www.udemy.com/course/programming-games-for-the-atari-2600/",
  "https://www.udemy.com/course/the-modern-angular-bootcamp/",
  "https://www.udemy.com/course/threejs-tutorials/",
  "https://www.udemy.com/course/typescript-the-complete-developers-guide/",
];

const crawler = new UdemyCrawler({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
    "upgrade-insecure-requests": 1,
  },
});

const crawlSync = (url) => {
  return new Promise((resolve, reject) => {
    crawler.execute(url, function (err, course) {
      if (err) {
        reject(err);
      }
      // console.log(JSON.stringify(course, null, 4));
      resolve(course);
    });
  });
};

let crawledCourses = [];
let emailList = [];
let studentList = [];
let lecturerList = [];
let adminList = [];
let courseIDList = [];
let mainCatList = [
  "Web",
  "Mobile",
  "Game",
  "Bussiness",
  "Music",
  "Health",
  "Personal Development",
  "Art",
  "Sport",
  "Mental",
  "Manager",
];
let subCatList = [
  "NodeJS",
  "MongoDB",
  "English",
  "SQL",
  "JavaScript",
  "Express",
  "React",
  "Angular",
  "Go",
  "Cassandra",
  "Badminton",
  "Unagi",
  "Leadership",
];

const nStudent = CONFIG.seeder.nStudentEmail;
const nLecturer = CONFIG.seeder.nLecturerEmail;
const nAdmin = CONFIG.seeder.nAdminEmail;
const nEmail = nStudent + nLecturer + nAdmin;

let transDateList = [];
let weeklyTransDateList = [];

const generate = async () => {
  console.log("Start generating courses in generator");
  // let course;
  for (url of courseUrls) {
    course = await crawlSync(url);

    // console.log(course);
    crawledCourses.push(course);
    courseIDList.push({ id: course.id, lectureCount: 0 });
  }
  console.log("End generating courses in generator");

  console.log("Start generating emails in generator");
  for (let i = 0; i < nEmail; i++) {
    emailList.push(faker.unique(faker.internet.email));
  }

  // console.log("Email List: ");
  // console.log(emailList);

  // studentList = emailList.slice(0, nStudent);
  // for (let i = 0; i < nStudent; i++) {
  //   studentList.push(emailList[i]);
  // }
  studentList.push(...emailList.slice(0, nStudent));
  // console.log("Student List: ");
  // console.log(studentList);

  // lecturerList = emailList.slice(nStudent, emailList.length); // loosing reference
  // for (let i = nStudent; i < emailList.length; i++) {
  //   lecturerList.push(emailList[i]);
  // }
  lecturerList.push(...emailList.slice(nStudent, nStudent + nLecturer)); // modify in place to keep reference
  // console.log("Lecturer List: ");
  // console.log(lecturerList);
  adminList.push(...emailList.slice(nStudent + nLecturer, emailList.length));
  console.log("End generating emails in generator");

  // console.log("Start generating weekly transaction in generator");
  // weeklyTransDateList.push(...getWeekDateAfter(CONFIG.seeder.weekStart));
  // console.log("End generating weekly transaction in generator");

  // console.log("Start generating transaction in generator");

  // console.log("End generating transaction in generator");
};

module.exports = {
  generate,
  crawledCourses,
  studentList,
  lecturerList,
  adminList,
  courseIDList,
  mainCatList,
  subCatList,
  transDateList,
  weeklyTransDateList,
};
