const Student = require(__basedir + '/models/student').model;


const marked_finish = async function (studentID, courseID, lecutureID){
    var aUser = await Student.findById(studentID);
    var index = aUser.courses.findIndex(c=>c.course == courseID);
    if(index<0){
        return {success: false};
    }
    var lec_index = aUser.courses[index].progress.tracked_list.findIndex(tr => tr.lecture==lecutureID);
    if(lec_index<0){
        return { success: false };
    }
    aUser.courses[index].progress.tracked_list[lec_index].finished = true;
    aUser.save().exec();
    return{success: true};
}

const unMarked_finish = async function (studentID, courseID, lecutureID) {
    var aUser = await Student.findById(studentID);
    var index = aUser.courses.findIndex(c => c.course == courseID);
    if (index < 0) {
        return { success: false };
    }
    var lec_index = aUser.courses[index].progress.tracked_list.findIndex(tr => tr.lecture == lecutureID);
    if (lec_index < 0) {
        return { success: false };
    }
    aUser.courses[index].progress.tracked_list[lec_index].finished = false;
    aUser.save().exec();
    return { success: true };
}

module.exports = {
    marked_finish,
    unmarked_finish: unMarked_finish
}