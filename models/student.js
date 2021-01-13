const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  courses: [
    {
      progress: [Schema.Types.ObjectId],
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
