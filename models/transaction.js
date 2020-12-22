const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = Schema({
    date: Date,

    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },

    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    model: Transaction
}

