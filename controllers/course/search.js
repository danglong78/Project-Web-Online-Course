const Course = require(__basedir + '/models/Course').model;
const Category = require(__basedir + '/models/Category').model;


const fullTextSearch = async (key, catName, page, limit) => {

    try {
        let courses;

        if (catName) {
            const foundCat = await Category.findOne({ name: catName }).lean();

            if (foundCat) {
                const query = { 
                    $and: [
                        { $text: { $search: key } },
                        { categories: foundCat._id }
                    ]
                };

                const options = {
                    page,
                    limit, 
                    lean: true,
                    projection: { score: { $meta: "textScore" } },
                    sort: { score: { $meta: "textScore" } }                
                  };


                courses = await Course.aggregate([
                {
                    $match: 
                },

                ]);

            }
            
        }
        else {
            courses = await Course.aggregate([
                { $match: { $text: { $search: key } } },

            ]);

        }


        if (courses) {
            return courses;
        }
        return null;
    }
    catch (err) {
        console.log(err);
        return null
    }


}
