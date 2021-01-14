
var courseModel = require('../../models/course').model;
var getAllCate = require('../category/getAll');
var uploadVideo = require('../course/uploadCourse').uploadVideo;
var uploadImg = require('../course/uploadCourse').uploadImage;
var course = require("../../models/course").model;
var fs = require('fs')
var mongoose = require('mongoose');
const getCourseInfor = async function (req, res) {
    let course = await courseModel.findOne({ _id: req.query.id })
    console.log(course.chapter[0]._id);
    let category = await getAllCate()
    res.render("lecturer/edit_course", { course, category, statics:__statics})
}


const deleteChapter = async (req, res) => {
    // id,chapterID
    const id = req.body.id;
    const chapterid = req.body.chapterID;
    var aCourse = await course.findById(id);
    if (aCourse == null) {
        res.send({ success: false });
    }
    else
    {
        var temp = [];
        for (var i = 0; i < aCourse.chapter.length; i++) {
            if (i != chapterid) {
                temp.push(aCourse.chapter[i]);
            }
            else{
                for( let l of aCourse.chapter[i].lecture){
                    try{
                        if (fs.existsSync(`.${l.file}`))
                            fs.unlinkSync(`.${l.file}`)
                    }catch (e) {
                        console.log(e)
                    }
                }
            }
        }
        aCourse.chapter = temp;
        course.updateOne({_id: id}, {$set: aCourse}).exec();
        res.send({success: true});
    }
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
    else
    {
        var temp = [];
        for (var i = 0; i < aCourse.chapter[chapter_index].lecture.length; i++) {
            if (i != lecture_index) {
                temp.push(aCourse.chapter[chapter_index].lecture[i]);
            }
            else{
                if (fs.existsSync(`.${aCourse.chapter[chapter_index].lecture[i].file}`))
                    fs.unlinkSync(`.${aCourse.chapter[chapter_index].lecture[i].file}`)
            }
        }
        aCourse.chapter[chapter_index].lecture = temp;
        course.updateOne({_id: id}, {$set: aCourse}).exec();
        res.send({success: true});
    }
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
    // id lecture vua sua
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
    res.send({ success: true,lectureID: aCourse.chapter[chap_index].lecture[lec_index]._id});
}
const addChapter = async (req, res) => {
    console.log(req.body);
    // id,chapter: { title,durationText, lecture, }
    //lecture chỉ lưu title,durationText,description,preview còn video thì để hàm receiveMultiVideo xử lí rồi
    var chapter = req.body.chapter;
    var id = req.body.id;
    var aChapter = {
        _id: mongoose.Types.ObjectId(),
        title: chapter.title,
        durationText: chapter.durationText,
        lecture: [],
        duration: 0
    }
    var lecture_list = [];
    for(var i=0;i<chapter.lecture.length;i++){
        var aLecture = {
            _id: mongoose.Types.ObjectId(),
            title: chapter.lecture[i].title,
            description: chapter.lecture[i].description,
            durationText: chapter.lecture[i].durationText,
            //preview: chapter.lecture[i].preview
        };
        aChapter.lecture.push(aLecture);
        lecture_list.push(aLecture._id);
    }
    var aCourse = await course.findById(id);
    if(aCourse==null){
        res.send({ success: false, lectureID: [] });
    }
    aCourse.chapter.push(aChapter);
    course.updateOne({_id:id},{$set:aCourse}).exec();
    res.send({ success: true, lectureID: lecture_list });
    //lectureID là list danh sách objectid của lecture
}
const addLecture = async (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const index = req.body.chapterID;
    var lecture = req.body.lecture;
    var aLec = {
        _id: mongoose.Types.ObjectId(),
        title: lecture.title,
        durationText: lecture.durationText,
        description:lecture.description,
        //preview: chapter.lecture[i].preview
    }
    var aCourse = await course.findById(id);
    if(aCourse==null){
        res.send({ success: false, lectureID: 123231223 });
    }
    aCourse.chapter[index].lecture.push(aLec);
    aCourse.chapter[index].durationText = add(aCourse.chapter[index].durationText,aLec.durationText);
    aCourse.chapter[index].duration = min2int(aCourse.chapter[index].durationText);
    course.updateOne({_id:id},{$set:aCourse}).exec();
    // id,chapterID,lecureID ,lecture: { title,durationText,description,preview },
    // video thì có hàm receive video xử lý rồi
    res.send({ success: true, lectureID: aLec._id });
    console.log("LECTURE ID"+aLec._id);
    //lectureID là objectID của lecture

}
const receiveImage= (req,res) =>{
    uploadImg.single('image')(req, res, async (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {

            res.send('Receive Image success');
            let c = await courseModel.findOne({ _id: req.body.id })
            c.avatar = req.body.filename;
            await c.save();
            console.log('Image uploaded successfully');

        }
    });
}
// req.body.id : la id cua course can block
const disable_course = async function(req,res){
    const id = req.body.id;
    var aCourse = await course.findById(id);
    if(aCourse==null){
        res.send({success: false});
    }else{
        aCourse.isDisabled = true;
        res.send({success: true});
    }
}
const able_course = async function (req, res) {
    const id = req.body.id;
    var aCourse = await course.findById(id);
    if (aCourse == null) {
        res.send({ success: false });
    } else {
        aCourse.isDisabled = false;
        res.send({ success: true });
    }
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
            let videoArr = JSON.parse(req.body.videoName)
            console.log(req.body.videoName)
            let c = await courseModel.findOne({ _id: req.body.id })
            let i = c.chapter.length - 1;
            for (let j = 0; j < c.chapter[i].lecture.length; j++) {
                c.chapter[i].lecture[j].file = `${videoArr[j]}`;
            }
            await c.save();
            console.log('Video uploaded succcessfully');
        }
    })

}

const editCourse = async (req,res)=>{
    let course = await courseModel.findOne({ _id: req.body.id })
    let newInfor= req.body.rs;
    course.title = newInfor.title;
    course.finished = newInfor.finished;
    course.short_description = newInfor.short_description;
    course.fullPrice = newInfor.price;
    course.price = newInfor.price;
    course.category= newInfor.category;
    course.subCategory = newInfor.subCategory;
    course.updateDate = newInfor.updateDate;

    await course.save();

    res.send({success:true})

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
    receiveMultiVideo,
    receiveImage,
    editCourse,
    disable_course,
    able_course

}