
var courseModel = require('../../models/course').model;
var getAllCate = require('../category/getAll');
var uploadVideo = require('../course/uploadCourse').uploadVideo;
var course = require("../../models/course").model;

const getCourseInfor = async function (req, res) {
    let course = await courseModel.findOne({ _id: req.query.id })
    console.log(course.chapter[0]._id);
    let category = await getAllCate()
    res.render("lecturer/edit_course", { course, category })
}


const deleteChapter = async (req, res) => {
    // id,chapterID
    const id = req.body.id;
    const chapterid = req.body.chapterID;
    var aCourse = await course.findById(id);
    if (aCourse == null) {
        res.send({ success: false });
    }
    var temp = [];
    for (var i = 0; i < aCourse.chapter.length; i++) {
        if (i != chapterid) {
            temp.push(aCourse.chapter[i]);
        }
    }
    aCourse.chapter = temp;
    course.updateOne({ _id: id }, { $set: aCourse }).exec();
    res.send({ success: true });
}
const deleteLecture = async (req, res) => {
    // id,chapterID,lectureID
    const id = req.body.id;
    const chapter_index = req.body.chapterID;
    const lecture_index = req.body.lectureID;
    var aCourse = await course.findById(id);
    if (aCourse == null) {
        res.send({ success: false });
    }
    var temp = [];
    for (var i = 0; i < aCourse.chapter[chapter_index].lecture.length; i++) {
        if (i != lecture_index) {
            temp.push(aCourse.chapter[chapter_index].lecture[i]);
        }
    }
    aCourse.chapter[chapter_index].lecture = temp;
    course.updateOne({ _id: id }, { $set: aCourse }).exec();
    res.send({ success: true });
}
const editChapter = async (req, res) => {
    // id,chapterID,chapter: { title,durationText, } ,
    console.log("chapter edit");
    const id = req.body.id;
    const chap_index = req.body.chapterID;
    const title = req.body.chapter.title;
    const duaration = req.body.chapter.durationText;
    var aCourse = await course.findById(id);
    if (aCourse == null) {
        res.send({ success: false });
    }
    aCourse.chapter[chap_index].title = title;
    aCourse.chapter[chap_index].durationText = duaration;
    course.updateOne({ _id: id }, { $set: aCourse }).exec();
    res.send({ success: true });
}
const editLecture = async (req, res) => {
    // id,chapterID,lecureID ,lecture: { title,durationText,description,preview },
    // cập nhạt từng cái giá trị trong lecture chứ đừng đè biến nha tại trong lecture còn file
    // biến file sẽ được xử lý sau
    console.log("edit lecture");
    console.log(req.body);
    const id = req.body.id;
    const chap_index = req.body.chapterID;
    const lec_index = req.body.lectureID;
    var aCourse = await course.findById(id);
    if(aCourse.chapter.length<=chap_index || aCourse.chapter[chap_index].lecture.length<=lec_index){
        res.send({ success: false });
    }
    aCourse.chapter[chap_index].lecture[lec_index].title = req.body.lecture.title;
    aCourse.chapter[chap_index].lecture[lec_index].durationText = req.body.lecture.durationText;
    aCourse.chapter[chap_index].lecture[lec_index].description = req.body.lecture.description;
    aCourse.chapter[chap_index].lecture[lec_index].preview = req.body.lecture.preview;
    var temp = "00:00";
    for (var i = 0; i < aCourse.chapter[chap_index].lecture.length;i++){
        temp = add(temp,aCourse.chapter[chap_index].lecture[i].durationText);
    }
    aCourse.chapter[chap_index].durationText = temp;
    course.updateOne({_id:id},{$set:aCourse}).exec();
    res.send({ success: true});
}
const addChapter = (req, res) => {
    // id,chapter: { title,durationText, lecture, }
    //lecture chỉ lưu title,durationText,description,preview còn video thì để hàm receiveMultiVideo xử lí rồi
    console.log("add chapter");
    console.log(req.body);
    console.log(req.body.chapter.lecture[0]);
    res.send({ success: true, lectureID: [] });
    //lectureID là list danh sách objectid của lecture
}
const addLecture = (req, res) => {
    console.log("add lecture")
    // id,chapterID,lecureID ,lecture: { title,durationText,description,preview },
    // video thì có hàm receive video xử lý rồi
    res.send({ success: true, lectureID: 123231223 })
    //lectureID là objectID của lecture

}
const receiveVideo = (req, res) => {
    uploadVideo.single('video')(req, res, async (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {

            res.send('Receive Video sucesss');
            let c = await courseModel.findOne({ _id: req.body.id })
            c.chapter[req.body.chapterIndex].lecture[req.body.lectureIndex].file = req.body.videoName;
            await c.save();
            console.log('Video uploaded succcessfully');

        }
    });
}
const receiveMultiVideo = function (req, res) {
    uploadVideo.any()(req, res, async (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {

            res.send('Receive Video sucesss');
            let videoArr = JSON.parse(req.body.FileName)
            let c = await courseModel.findOne({ _id: req.body.id })
            let i = c.chapter.length - 1;
            for (j = 0; j < c.chapter[i].lecture.length; j++) {
                c.chapter[i].lecture[j].file = `${videoArr[j]}`;
            }
            c.save();
            console.log('Video uploaded succcessfully');

        }
    })

}


const min2int = function (s) {
    var temp = s.split(':');
    var re = 0;
    for (var i = 0; i < temp.length; i++) {
        re = re * 60;
        re += parseInt(temp[i]);
    }
    return re;
}

const int2min = function (n) {
    var sec = n % 60;
    n = (n - sec) / 60;
    var min = n % 60;
    n = (n - min) / 60;
    var hour = n;
    var re = "";
    if (hour > 0) {
        re += hour.toString();
        re += ":";
    }
    min = min.toString();
    if (min.length < 2) {
        min = "0" + min;
    }
    re += min;
    re += ":";
    sec = sec.toString();
    if (sec.length < 2) {
        sec = "0" + sec;
    }
    re += sec;
    return re;
}

const add = function (s1, s2) {
    var n1 = min2int(s1);
    var n2 = min2int(s2);
    var sum = n1 + n2;
    return int2min(sum);
}


module.exports = {
    getCourseInfor,
    deleteChapter,
    deleteLecture,
    editChapter,
    editLecture,
    addChapter,
    addLecture,
    receiveVideo,
    receiveMultiVideo

}