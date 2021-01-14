const Student = require(__basedir + '/models/student').model;
const addprogress = require('../student/add_progress');

const marked_finish = async function (studentID, courseID, lecutureID){
    var aUser = await Student.findById(studentID);
    var index = aUser.courses.findIndex(c=>c.course == courseID);
    if(index<0){
        return {success: false};
    }
    var lec_index = aUser.courses[index].progress.tracked_list.findIndex(tr => tr.lecture==lecutureID);
    if(lec_index<0){
        await addprogress(`${studentID}`,`${courseID}`,`${lecutureID}`)
        aUser = await Student.findById(studentID);
        lec_index = aUser.courses[index].progress.tracked_list.findIndex(tr => tr.lecture==lecutureID);
    }
    aUser.courses[index].progress.tracked_list[lec_index].finished = true;
    await aUser.save();

    let count_finished =  (aUser.courses[index].progress.tracked_list.filter( c=> c.finished===true)).length
    return{success: true,count:count_finished};
}

const unMarked_finish = async function (studentID, courseID, lecutureID) {
    var aUser = await Student.findById(studentID);
    var index = aUser.courses.findIndex(c => c.course == courseID);
    if (index < 0) {
        return { success: false };
    }
    var lec_index = aUser.courses[index].progress.tracked_list.findIndex(tr => tr.lecture == lecutureID);
    if(lec_index<0){
        await addprogress(`${studentID}`,`${courseID}`,`${lecutureID}`)
        aUser = await Student.findById(studentID);
        lec_index = aUser.courses[index].progress.tracked_list.findIndex(tr => tr.lecture==lecutureID);
    }
    aUser.courses[index].progress.tracked_list[lec_index].finished = false;
    await aUser.save();
    let count_finished =  (aUser.courses[index].progress.tracked_list.filter( c=> c.finished===true)).length
    return{success: true,count:count_finished};
}

module.exports = {
    marked_finish,
    unmarked_finish: unMarked_finish
}