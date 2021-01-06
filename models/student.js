const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = Schema({
  courses: [
    {
      progress: [Number],
      course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    },
  ],

  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = {
  model: Student,
};
