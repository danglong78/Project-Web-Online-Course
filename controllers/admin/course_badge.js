const course = require("../../models/course").model;

const averege_rate = function(rate){
    if(rate.length<=0){
        return 0;
    }
    var sum = 0;
    for(var i=0;i<rate.length;i++){
        sum+=rate[i].score;
    }
    return (sum)/(rate.length)
}


const tag_badge = async function(n){
    // reset badge of all course:
    await course.updateMany({},{badge: ""}).exec();
    

    // tag "best seller" badge:
    var course_list = await course.find().sort({enrollCount:-1}).exec();
    var count=0;
    var i=0;
    while(i<course_list.length&&count<n){
        if(course_list[i].badge==""){
            course_list[i].badge = "Best Seller";
            count++;
            i++;
        }
    }
    
    // tag "highly rated" badge:
    course_list.sort(function (a, b) { return averege_rate(b.rates)-averege_rate(a.rates) });
    count = 0;
    i = 0;
    while (i < course_list.length && count < n) {
        if (course_list[i].badge == "") {
            course_list[i].badge = "Highly Rated";
            count++;
        }
        i++;
    }
    
    // tag "On Trend" badge:
    course_list.sort(function(a,b){return b.viewCount-a.viewCount});
    count = 0;
    i = 0;
    while (i < course_list.length && count < n) {
        if (course_list[i].badge == "") {
            course_list[i].badge = "On Trend";
            count++;
        }
        i++;
    }

    // tag "New" badge:
    course_list.sort(function (a, b) { return b.createdAt - a.createdAt});
    count = 0;
    i = 0;
    while (i < course_list.length && count < n) {
        if (course_list[i].badge == "") {
            course_list[i].badge = "New";
            count++;
        }
        i++;
    }
    
    for(i=0;i<course_list.length;i++){
        course.updateOne({_id:course_list[i]._id},{$set:course_list[i]}).exec();
    }
}

module.exports = tag_badge