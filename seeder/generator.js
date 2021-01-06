const faker = require('faker');
const { Seeder } = require('mongo-seeding');
const UdemyCrawler = require('./crawler');

const courseUrls = [
    "https://www.udemy.com/course/docker-mastery/",
    "https://www.udemy.com/course/nodejs-the-complete-guide/",
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
]




const crawler = new UdemyCrawler({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
        'upgrade-insecure-requests': 1
    }
});
  



// const courses = courseUrls.map( async (courseUrl) => {
//     try {
//         let course = await crawler.execute(courseUrl);
//         console.log(course);
//         return course;
//     }
//     catch (err) {
//         console.log(err);
//         return null;
//     }
// })


// let course;
// let courses = [];
// courseUrls.forEach(async (courseUrl) => {
//     course = await crawler.execute(courseUrl);
//     console.log(course);
//     courses.push(course);
// });


crawl = async (url) => {
    let course = await crawler.execute("https://www.udemy.com/course/nodejs-the-complete-guide/");
    return course;
}

let courses = crawl("https://www.udemy.com/course/nodejs-the-complete-guide/");
console.log(courses);

// let courses = crawler.execute("https://www.udemy.com/course/nodejs-the-complete-guide/", function (err, course) {

// if(err) {        
//     return console.error(err.message);
// }

// // console.log(JSON.stringify(course, null, 4));
// console.log(course);
// });


module.exports = {
    courses
}

