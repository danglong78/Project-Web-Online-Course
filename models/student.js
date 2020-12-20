const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = Schema({
    courses: [{
        progress: {
            type: Number
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    }],

    favorites: [{
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = {
    model: Student
}

