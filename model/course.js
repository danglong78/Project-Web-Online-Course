const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

const quizSchema = mongoose.Schema({
    short_description: {type: String,text: true},
    detail_description:{type: String,text: true},
    avatar:{type: String,text: true},
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    category:[{
        type: mongoose.Schema.Types.ObjectId
    }],
    finished: Boolean,
    price: {type: Number},
    chapter:[{
        title: String,
        content: String,
        link:String,
    }],
    viewer: Number,
    participant:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }],
    comment:[{
        student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
        },
        content: String

    }]

});


module.exports = {
    model: Course
}