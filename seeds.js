const {
  generate,
  crawledCourses,
  studentList,
  lecturerList,
  courseIDList,
  arr,
} = require("./seeder/generator");

// generate needs to run first
generate().then(() => {
  console.log("Start at seeds.js");

  console.log(arr);

  // console.log(JSON.stringify(crawledCourses, null, 4));

  console.log("CourseID List");
  // console.log(JSON.stringify(courseIDList, null, 4));
  console.log(courseIDList);

  console.log("Student List");
  // console.log(JSON.stringify(studentList, null, 4));
  console.log(studentList);

  console.log("Lecturer List");
  // console.log(JSON.stringify(lecturerList, null, 4));
  console.log(lecturerList);

  let courses = require("./seeder/data/3_courses/courses");
  console.log(JSON.stringify(courses, null, 4));

  console.log("End at seeds.js");

  // import to db
});
