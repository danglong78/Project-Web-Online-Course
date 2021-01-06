var uploadImg= require('../course/uploadCourse').uploadImage;
var uploadVideo= require('../course/uploadCourse').uploadVideo;
var courseModel= require('../../models/course').model;

receive_infor = async function (req,res) {
    let c= req.body
    chapter=[]
    lecture=[]
    let course= new courseModel({
        title:c.title,
        short_description: c.short_description,
        detail_description: c.detail_description,
        price: c.price,
        finished:c.finished,
        updateDate: c.updateDate,
        teacher: req.user.id,
        category:c.category,
        subCategory:c.subCategory
    })
    for (i = 0; i < c.chapter.length; i++) {
        lectureArray=[]
        for(j=0;j<c.chapter[i].lecture.length;j++)
        {
            lectureArray.push({title:c.chapter[i].lecture[j].title,
                duration:c.chapter[i].lecture[j].duration,
                content:c.chapter[i].lecture[j].content,
                preview:c.chapter[i].lecture[j].preview
            })
        }
        chapter.push({
            title:c.chapter[i].title,
            duration:c.chapter[i].duration,
            lecture:[...lectureArray]
        })
        lecture.push([...lectureArray])
    }
    course.chapter=chapter
    await course.save();
    res.send(course._id);
}
receive_img =  function (req,res) {
    uploadImg.single('image')(req,res, async (err) => {
        if(err){
            console.log(err);
            res.send(err);
        }else{

            res.send('Receive image sucesss');
            await courseModel.updateOne({ _id: req.body.id },{avatar:req.file.path});

            console.log('img uploaded succcessfully');

        }
    });
}
receive_vid =  function (req,res) {
    uploadVideo.any()(req,res, async  (err) => {
        if(err){
            console.log(err);
            res.send(err);
        }else{

            res.send('Receive Video sucesss');
            videoArr=JSON.parse(req.body.video)
            let c = await courseModel.findOne({ _id: req.body.id })
            for(i=0;i<c.chapter.length;i++)
            {
                for(j=0;j<c.chapter[i].lecture.length;j++)
                {
                    c.chapter[i].lecture[j].file=`${videoArr[i][j]}`;
                }
            }
            c.save();
            console.log('Video uploaded succcessfully');

        }
    });
}
module.exports = {
    receive_infor,
    receive_img,
    receive_vid
}