const UdemyCrawler = require("./crawler");
const faker = require("faker");

const courseUrls = [
  "https://www.udemy.com/course/startup-business-development-guide/",
  //   "https://www.udemy.com/course/docker-mastery/",
  //   "https://www.udemy.com/course/nodejs-the-complete-guide/",
  // "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c02/",
  // "https://www.udemy.com/course/the-ultimate-guide-to-game-development-with-unity/",
  // "https://www.udemy.com/course/the-complete-react-native-and-redux-course/",
  // "https://www.udemy.com/course/wifi-hacking-penetration-testing-from-scratch/",
  // "https://www.udemy.com/course/create-a-twitter-clone-with-nodejs-socketio-and-mongodb/",
  // "https://www.udemy.com/course/understand-nodejs/",
  // "https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/",
  // "https://www.udemy.com/course/the-complete-sql-bootcamp/",
  // "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
  // "https://www.udemy.com/course/advanced-javascript-concepts/",
  // "https://www.udemy.com/course/microservices-with-node-js-and-react/",
  // "https://www.udemy.com/course/graphql-with-react-course/",
  // "https://www.udemy.com/course/learn-devops-the-complete-kubernetes-course/",
  // "https://www.udemy.com/course/unreal-engine-4-blueprints/",
  // "https://www.udemy.com/course/programming-games-for-the-atari-2600/",
  // "https://www.udemy.com/course/the-modern-angular-bootcamp/",
  // "https://www.udemy.com/course/threejs-tutorials/",
  // "https://www.udemy.com/course/typescript-the-complete-developers-guide/"
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
let courseIDList = [];
let mainCatList = [
  "Web",
  "Mobile",
  "Game",
  "Bussiness",
  "Music",
  "Health",
  "Personal Development",
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
];
const nEmail = 20;
const nStudent = 15;

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
  lecturerList.push(...emailList.slice(nStudent, emailList.length)); // modify in place to keep reference
  // console.log("Lecturer List: ");
  // console.log(lecturerList);

  console.log("End generating emails in generator");
};

module.exports = {
  generate,
  crawledCourses,
  studentList,
  lecturerList,
  courseIDList,
  mainCatList,
  subCatList,
};
