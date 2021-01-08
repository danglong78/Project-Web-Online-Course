const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weeklyTransactionSchema = Schema({
  date: Date,

  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },

  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

const weeklyTransaction = mongoose.model(
  "WeeklyTransaction",
  weeklyTransactionSchema
);

module.exports = {
  model: weeklyTransaction,
};
