const  courseModel = require('../../models/course').model
const  studentModel = require('../../models/student').model
const checkRated = require('../../controllers/student/rate_course').check_rated;
const addProgress = require('../../controllers/student/add_progress')
const getCourse = async (req,res) =>{
    let course = await courseModel.findById(req.params.id);
    let student = await studentModel.findById(req.user.id);
    let progress;
    for(var c of student.courses)
    {
        if (c.course==req.params.id)
            progress=c.progress;
    }
    let isRated = await checkRated(`${req.user.id}`,`${course._id}`);

    res.render("lecture_detail",{statics: __statics,course,progress,isRated});
}

// gửi id course, id lecture cũ, checkpoint của lecture cũ, id của lecture mới
// nhận checkpoint của lecture mới. lưu lastest lecture là lecture mới
const change_lecture = async function(req,res){
    const id = req.user.id;
    const course_id = req.body.id;
    const pre_lecture = req.body.preID;
    const next_lecure = req.body.nextID;
    const checkPoint = req.body.checkpoint;
    var aUser = await studentModel.findById(id);
    var index = aUser.courses.findIndex(c=>c.course==course_id);
    if(index<0){
        res.send({success: false});
    }
    else{
        var lec_index = aUser.courses[index].progress.tracked_list.findIndex(lec => lec.lecture==pre_lecture);
        if(lec_index<0){
            await addProgress(`${id}`,`${course_id}`,`${pre_lecture}`)
            aUser = await studentModel.findById(id);
            lec_index = aUser.courses[index].progress.tracked_list.findIndex(tr => tr.lecture==pre_lecture);
        }
        aUser.courses[index].progress.tracked_list[lec_index].checkPoint = checkPoint;
        lec_index = aUser.courses[index].progress.tracked_list.findIndex(lec => lec.lecture == next_lecure);
        var check_point;
        if(lec_index<0){
            var temp = {
                lecture:next_lecure,
                finished: false,
                checkPoint:0
            }
            aUser.courses[index].progress.tracked_list.push(temp);
            check_point=0;
        }else{
            check_point = aUser.courses[index].progress.tracked_list[lec_index].checkPoint;
        }
        aUser.courses[index].progress.lasted_lecture = next_lecure;
        studentModel.updateOne({_id:aUser._id},{$set:aUser}).exec();
        res.send({ success: true, checkPoint: check_point});
    }
}


// gửi id course, id của lecture chuẩn bị học
// nhận checkpoint của lecture chuẩn bị học. lưu lastest lecture là lecture chuẩn bị học
// const load_checkpoint = async function(id,course_id,lecture_id){
//     var aUser = await studentModel.findById(id);
//     var index = aUser.courses.findIndex(c => c.course == course_id);
//     if(index<0){
//         return {}
//     }else{
//         var lec_index = aUser.courses[index].progress.tracked_list.findIndex(lec => lec.lecture == lecture_id);
//         var checkpoint;
//         if(lec_index<0){
//             var temp ={
//                 lecture: lecture_id,
//                 finished: false,
//                 checkPoint:0
//             }
//             aUser.courses[index].progress.tracked_list.push(temp);
//             checkpoint=0;
//         }else{
//             checkpoint = aUser.courses[index].progress.tracked_list[lec_index].checkPoint;
//         }
//         aUser.courses[index].progress.lasted_lecture = lecture_id;
//         studentModel.updateOne({ _id: id }, { $set: aUser }).exec();
//         return {success:true,checkpoint:checkpoint};
//     }
// }

module.exports={
    getCourse,
    changeLecture: change_lecture,
}
