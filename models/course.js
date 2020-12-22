const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

const courseSchema = mongoose.Schema({
    short_description: { type: String, text: true },
    detail_description: { type: String, text: true },
    avatar: { type: String, text: true },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Course
    }],
    finished: Boolean,
    price: { type: Number },
    chapter: [{
        title: String,
        duration: Number,
        lecture: [{
            title: String,
            duration: Number,
            content: String,
            file: String
        }]
    }],
    participant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    rates: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        score: String,
        review: String

    }],
    viewCount: {
        type: Number,
        index: true
    },
    enrollCount: {
        type: Number,
        index: true
    },
    favoriteCount: {
        type: Number,
        index: true
    },
    createdAt: {
        type: Date
    }

});
Course = mongoose.model('Course', courseSchema)

module.exports = {
    model: Course
}