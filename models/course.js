const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        text: true
    },

    short_description: { type: String, text: true },

    detail_description: { type: String, text: true },

    price: Number,

    finished: Boolean,

    updateDate: Date,

    avatar: { type: String, text: true },

    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Credential'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MainCategory'
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

courseSchema.plugin(mongoosePaginate);
Course = mongoose.model('Course', courseSchema)
//Course.paginate().then({}); // Usage

module.exports = {
    model: Course
}