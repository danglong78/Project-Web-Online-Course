const mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const studentSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  courses: [
    {
      progress: {
        lasted_lecture: Schema.Types.ObjectId,
        tracked_list: [{
          lecture: Schema.Types.ObjectId,
          finished: {
            type: Boolean,
            default: false
          },
          checkPoint: {
            type: Number,
            default: 0
          }
        }]
      },
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
studentSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Student = mongoose.model("Student", studentSchema);


module.exports = {
  model: Student,
};
