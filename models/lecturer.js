const mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const lecturerChema = Schema({
  name: {
    type: String,
    required: true,
  },

  shortDescbibe: {
    type: String,
    //required: true,
  },

  detailDescribe: {
    type: String,
    //required: true,
  },

  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
lecturerChema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Lecturer = mongoose.model("Lecturer", lecturerChema);


module.exports = {
  model: Lecturer,
};
