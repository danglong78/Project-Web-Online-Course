const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

const courseSchema = mongoose.Schema({
    title: String,
    short_description: { type: String, text: true },
    detail_description: { type: String, text: true },
    price: Number,
    finished: Boolean,
    updateDate: Date,
    avatar: { type: String, text: true },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },

    chapter: [{
        title: String,
        duration: Number,
        lecture: [{
            title: String,
            duration: Number,
            content: String,
            file: String,
            preview: Boolean
        }]
    }],

    participant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    comment: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        content: String

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