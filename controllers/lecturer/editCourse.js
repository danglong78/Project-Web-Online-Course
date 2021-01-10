
var courseModel= require('../../models/course').model;
var getAllCate = require('../category/getAll')
var uploadVideo= require('../course/uploadCourse').uploadVideo;

const getCourseInfor= async function(req,res){
    let course = await courseModel.findOne({_id:req.query.id})
    console.log(course.chapter[0]._id);
    let category = await getAllCate()
    res.render("lecturer/edit_course",{course,category})
}


const deleteChapter = async (req,res)=>{
    // id,chapterID
    console.log("delete chapter")

    res.send({success:true})
}
const deleteLecture =  (req,res)=>{
    // id,chapterID,lectureID
    console.log("delete lecture")

    res.send({success:true})
}
const editChapter= (req,res) =>{
    // id,chapterID,chapter: { title,durationText, } ,
    console.log("edit chapter")
    res.send({success:true})
}
const editLecture= (req,res) =>{
    // id,chapterID,lecureID ,lecture: { title,durationText,description,preview },
    // cập nhạt từng cái giá trị trong lecture chứ đừng đè biến nha tại trong lecture còn file
    // biến file sẽ được xử lý sau
    console.log("edit lecture")
    res.send({success:true})
}
const addChapter= (req,res) =>{
    // id,chapter: { title,durationText, lecture, }
    //lecture chỉ lưu title,durationText,description,preview còn video thì để hàm receiveMultiVideo xử lí rồi
    console.log("add chapter")

    res.send({success:true,lectureID:[]})
    //lectureID là list danh sách objectid của lecture
}
const addLecture= (req,res) =>{
    console.log("add lecture")
    // id,chapterID,lecureID ,lecture: { title,durationText,description,preview },
    // video thì có hàm receive video xử lý rồi
    res.send({success:true,lectureID:123231223})
    //lectureID là objectID của lecture

}
const receiveVideo = (req,res) =>{
    uploadVideo.single('video')(req,res, async  (err) => {
        if(err){
            console.log(err);
            res.send(err);
        }else{

            res.send('Receive Video sucesss');
            let c = await courseModel.findOne({ _id: req.body.id })
            c.chapter[req.body.chapterIndex].lecture[req.body.lectureIndex].file=req.body.videoName;
            await c.save();
            console.log('Video uploaded succcessfully');

        }
    });
}
const receiveMultiVideo =  function (req,res) {
    uploadVideo.any()(req,res, async  (err) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{

            res.send('Receive Video sucesss');
            videoArr=JSON.parse(req.body.video)
            let c = await courseModel.findOne({ _id: req.body.id })
            let i = c.chapter.length -1;
                for(j=0;j<c.chapter[i].lecture.length;j++)
                {
                    c.chapter[i].lecture[j].file=`${videoArr[j]}`;
                }
            c.save();
            console.log('Video uploaded succcessfully');

        }
    })

}
module.exports={
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