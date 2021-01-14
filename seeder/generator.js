const UdemyCrawler = require("./crawler");
const faker = require("faker");
const CONFIG = require("../config.json");
const { getObjectId } = require("mongo-seeding");

const courseUrls = [
  "https://www.udemy.com/course/startup-business-development-guide/",
  "https://www.udemy.com/course/amazo-quickstart-amazon-amazing-selling-machine-alternative/",
  "https://www.udemy.com/course/introduction-to-networking-quick-course/",
  "https://www.udemy.com/course/mongoosejs-essentials/",
  "https://www.udemy.com/course/cold-call-university-course-101-introduction/",
  "https://www.udemy.com/course/ultimate-child-sleep-solutions-from-the-sleep-nanny-baby-children/",
  "https://www.udemy.com/course/devtools-2017-the-basics-of-chrome-developer-tools/",
  "https://www.udemy.com/course/arduino-sbs-getting-serious/",
  "https://www.udemy.com/course/embedded-linux-step-by-step-using-beaglebone/",
  "https://www.udemy.com/course/linux-mastery/",
  "https://www.udemy.com/course/systems-administration-101-active-directory/",
  "https://www.udemy.com/course/windows-server-2016-administration-and-deployment/",
  "https://www.udemy.com/course/solidworks-sheet-metal/",
  "https://www.udemy.com/course/70534-azure/",
  "https://www.udemy.com/course/thecompletejobinterviewresumenetworknewcareerguide/",
  "https://www.udemy.com/course/growth-mindset-in-sales/",
  "https://www.udemy.com/course/negotiation-secrets-for-master-negotiators/",
  "https://www.udemy.com/course/leadership-leading-not-in-charge/",
  "https://www.udemy.com/course/the-new-manager-managing-people-teams-processes/",
  "https://www.udemy.com/course/leadership-science-for-decision-making/",
  "https://www.udemy.com/course/become-a-speeddemon-hack-automation-focus-efficiency-to-have-more-time/",
  "https://www.udemy.com/course/the-building-blocks-of-productivity-focus-habits-and-more/",
  "https://www.udemy.com/course/acoustic-guitar-system/",
  "https://www.udemy.com/course/beginning-blues-rhythm-guitar/",
  "https://www.udemy.com/course/sight-reading/",
  "https://www.udemy.com/course/pianoforall-incredible-new-way-to-learn-piano-keyboard/",
  "https://www.udemy.com/course/cello101/",
  "https://www.udemy.com/course/piano-lessons-music-theory-beginners-course/",
  "https://www.udemy.com/course/learndrums/",
  "https://www.udemy.com/course/seo-get-to-number1-in-google-search/",
  "https://www.udemy.com/course/learn-google-adwords-course-for-beginners/",
  "https://www.udemy.com/course/chatbot-messenger-marketing-masterclass/",
  "https://www.udemy.com/course/learn-digital-marketing-course/",
  "https://www.udemy.com/course/the-ultimate-google-adwords-training-course/",
  "https://www.udemy.com/course/social-media-marketing-agency-digital-business-facebook-ads-instagram/",
  "https://www.udemy.com/course/modern-copywriting-writing-copy-that-sells-in-2018/",
  "https://www.udemy.com/course/how-to-plan-a-green-sustainable-event/",
  "https://www.udemy.com/course/the-most-effective-way-to-sell-coaching-or-consulting-services/",
  "https://www.udemy.com/course/counselling-children/",
  "https://www.udemy.com/course/train-to-be-your-own-counsellor-cbt-therapist/",
  "https://www.udemy.com/course/modern-neuroplasticity-how-to-rewire-your-brain-for-success/",
  "https://www.udemy.com/course/internationally-accredited-diploma-in-yoga-training/",
  "https://www.udemy.com/course/total-transformation/",
  "https://www.udemy.com/course/yoga-for-weight-loss-and-core-strength-with-sadie-nardini/",
  "https://www.udemy.com/course/core-stability/",
  "https://www.udemy.com/course/andreagassi/",
  "https://www.udemy.com/course/the-perfect-golf-swing/",
  "https://www.udemy.com/course/the-ultimate-soccer-guide/",
  "https://www.udemy.com/course/table-tennis-for-beginners/",
  "https://www.udemy.com/course/how-to-analyze-football-soccer-basics/",
  "https://www.udemy.com/course/internationally-accredited-diploma-certificate-in-nutrition/",
  "https://www.udemy.com/course/whole-food-plant-based-diet/",
  "https://www.udemy.com/course/meal-plan-and-grocery-list-builder-with-airtable/",
  "https://www.udemy.com/course/vegan-cooking-and-nutrition-health-coach-certification/",
  "https://www.udemy.com/course/diploma-certificate-in-dietary-supplements-advisor/",
  "https://www.udemy.com/course/blockchain-and-bitcoin-fundamentals/",
  "https://www.udemy.com/course/cryptocurrency-complete-bitcoin-ethereum-course/",
  "https://www.udemy.com/course/complete-investing-course-stocks-etfs-index-mutual-funds/",
  "https://www.udemy.com/course/investing-in-stocks/",
  "https://www.udemy.com/course/forex-trading/",
  "https://www.udemy.com/course/mern-stack-e-commerce-mobile-app-react-native-redux-expo/",
  "https://www.udemy.com/course/ios11-app-development-bootcamp/",
  "https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/",
  "https://www.udemy.com/course/complete-android-n-developer-course/",
  "https://www.udemy.com/course/react-native-the-practical-guide/",
  "https://www.udemy.com/course/the-complete-android-oreo-developer-course/",
  "https://www.udemy.com/course/ionic-2-the-practical-guide-to-building-ios-android-apps/",
  "https://www.udemy.com/course/xamarin-forms-course/",
  "https://www.udemy.com/course/android-oreo-kotlin-app-masterclass/",
  "https://www.udemy.com/course/dart-and-flutter-the-complete-developers-guide/",
  "https://www.udemy.com/course/java-android-complete-guide/",
  "https://www.udemy.com/course/ios-augmented-reality-the-complete-course-on-arkit/",
  "https://www.udemy.com/course/the-complete-guide-to-running-a-mobile-app-dev-business/",
  "https://www.udemy.com/course/nativescript-angular-build-native-ios-android-web-apps/",
  "https://www.udemy.com/course/augmented_reality_with_unity/",
  "https://www.udemy.com/course/complete-elasticsearch-masterclass-with-kibana-and-logstash/",
  "https://www.udemy.com/course/the-complete-oracle-sql-certification-course/",
  "https://www.udemy.com/course/sql-advanced/",
  "https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/",
  "https://www.udemy.com/course/oracle-sql-12c-become-an-sql-developer-with-subtitle/",
  "https://www.udemy.com/course/apache-cassandra/",
  "https://www.udemy.com/course/dynamodb/",
  "https://www.udemy.com/course/sql-and-postgresql/",
  "https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/",
  "https://www.udemy.com/course/mobile-automation-using-appiumselenium-3/",
  "https://www.udemy.com/course/azure-devops-fundamental/",
  "https://www.udemy.com/course/gcp-data-engineer-and-cloud-architect/",
  "https://www.udemy.com/course/learn-software-testing-in-practical-become-a-qa-expert/",
  "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
  "https://www.udemy.com/course/beginning-c-plus-plus-programming/",
  "https://www.udemy.com/course/ultimate-excel-programmer/",
  "https://www.udemy.com/course/the-modern-python3-bootcamp/",
  "https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/",
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

((courseUrls) => {
  console.log("before length: " + courseUrls.length);
  for (let url in courseUrls) {
    let idx = courseUrls.indexOf(url);
    if (idx !== -1) {
      console.log("Duplicated");
      console.log(url);
      courseUrls.splice(idx, 1);
    }
  }
  console.log("after length: " + courseUrls.length);
})(courseUrls);

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
      resolve(course);
    });
  });
};

let crawledCourses = [];
let emailList = [];
let studentList = [];
let lecturerList = [];
let lecturerCourseMap = new Map();
let adminList = [];
let courseIDList = [];
// let mainCatList = [
//   "Web",
//   "Mobile",
//   "Game",
//   "Bussiness",
//   "Music",
//   "Health",
//   "Personal Development",
//   "Art",
//   "Sport",
//   "Mental",
//   "Manager",
// ];
// let subCatList = [
//   "NodeJS",
//   "MongoDB",
//   "English",
//   "SQL",
//   "JavaScript",
//   "Express",
//   "React",
//   "Angular",
//   "Go",
//   "Cassandra",
//   "Badminton",
//   "Unagi",
//   "Leadership",
// ];

let mainCatMap = new Map();
let subCatList = [];

const nStudent = CONFIG.seeder.nStudentEmail;
const nLecturer = CONFIG.seeder.nLecturerEmail;
const nAdmin = CONFIG.seeder.nAdminEmail;
const nEmail = nStudent + nLecturer + nAdmin;

let transDateList = [];
let weeklyTransDateList = [];

let objectIDs = [];

const generate = async () => {
  console.log("Start generating courses in generator");
  // let course = {};
  for (url of courseUrls) {
    let course = await crawlSync(url);

    console.log(course);
    // console.log(JSON.stringify(course, null, 4));
    crawledCourses.push(course);
    courseIDList.push({ id: course.id, lectureCount: 0, lecIDs: [] });
    let objID = getObjectId(course.id);
    objectIDs.push(objID);
    console.log(objID);
  }

  ((objectIDs) => {
    console.log("before length: " + objectIDs.length);
    for (let id in objectIDs) {
      let idx = objectIDs.indexOf(id);
      if (idx !== -1) {
        console.log("Duplicated");
        console.log(id);
        objectIDs.splice(idx, 1);
      }
    }
    console.log("after length: " + objectIDs.length);
    console.log(JSON.stringify(objectIDs));
  })(objectIDs);

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
  for (let email of lecturerList) {
    lecturerCourseMap.set(email, []);
  }

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
  lecturerCourseMap,
  adminList,
  courseIDList,
  transDateList,
  weeklyTransDateList,
  mainCatMap,
  subCatList,
};
