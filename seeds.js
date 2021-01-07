// const {
//   generate,
//   crawledCourses,
//   studentList,
//   lecturerList,
//   courseIDList,
// } = require("./seeder/generator");

const { randDateAfter } = require("./seeder/helpers/index");

console.log(
  ...randDateAfter("2020-01-01", 5).map((date) => date.toDateString())
);

// const { randDateAfter } = require("./seeder/helpers/index");

// console.log(
//   ...randDateAfter("2020-01-01", 5).map((date) => date.toDateString())
// );

// generate needs to run first
generate().then(() => {
  // console.log("Start at seeds.js");

  // // console.log(JSON.stringify(crawledCourses, null, 4));

  // // console.log(
  // //   "\t\t======================= CourseID List ======================="
  // // );
  // // console.log(JSON.stringify(courseIDList, null, 4));
  // // console.log(courseIDList);

  // // console.log(
  // //   "\t\t======================= Student List ======================="
  // // );
  // // console.log(JSON.stringify(studentList, null, 4));
  // // console.log(studentList);

  // // console.log(
  // //   "\t\t======================= Lecturer List ======================="
  // // );
  // // console.log(JSON.stringify(lecturerList, null, 4));
  // // console.log(lecturerList);

  // console.log(
  //   "\t\t======================= Credentials ======================="
  // );
  // let credentials = require("./seeder/data/1_credentials/credentials");
  // console.log(credentials);

  // console.log("\t\t======================= Lecturers =======================");
  // let lecturers = require("./seeder/data/2_lecturers/lecturers");
  // console.log(JSON.stringify(lecturers, null, 4));

  // console.log("\t\t======================= Admins =======================");
  // let admins = require("./seeder/data/3_admins/admins");
  // console.log(JSON.stringify(admins, null, 4));

  // // console.log("\t\t======================= Courses =======================");
  // // let courses = require("./seeder/data/4_courses/courses");
  // // console.log(JSON.stringify(courses, null, 4));

  // console.log("\t\t======================= Students =======================");
  // let students = require("./seeder/data/5_students/students");
  // console.log(JSON.stringify(students, null, 4));

  // // console.log(
  // //   "\t\t======================= Main categories ======================="
  // // );
  // // let mainCats = require("./seeder/data/6_mainCats/mainCats");
  // // console.log(mainCats);

  // // console.log(
  // //   "\t\t======================= Sub categories ======================="
  // // );
  // // let subCats = require("./seeder/data/7_subCats/subCats");
  // // console.log(subCats);

  // console.log(
  //   "\t\t======================= Transaction ======================="
  // );
  // let transactions = require("./seeder/data/8_transactions/transactions");
  // console.log(transactions);

  // ****************************************************************************************
  // import to db
  const path = require("path");
  const { Seeder } = require("mongo-seeding");

  const config = {
    database: {
      name: "udemyclone",
    },
    dropDatabase: true,
  };
  const seeder = new Seeder(config);
  const collections = seeder.readCollectionsFromPath(
    path.resolve("./seeder/data"),
    {
      transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
    }
  );

  seeder
    .import(collections)
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log("Error", err);
    });

  console.log("End at seeds.js");
});

