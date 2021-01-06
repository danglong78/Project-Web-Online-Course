const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lecturerChema = Schema({
    shortDescbibe: {
        type: String,
        required: true
    },
    detailDescribe: {
        type: String,
        required: true
    }
});

const Lecturer = mongoose.model('Lecturer', lecturerChema);

module.exports = {
    model: Lecturer
}