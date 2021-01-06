const mongoosePaginate = require('mongoose-paginate-v2');
const Course = require(__basedir + '/models/Course').model;
const Category = require(__basedir + '/models/Category').model;


const getByCategory = (catName, page, limit) => {
    const options = {
        page,
        limit,
        sort: { enrollCount: -1 },
        lean: true
    };

    try {
        const foundCat = await Category.findOne({ name: catName }).lean();
        if (foundCat) {
            let courses = await Course.paginate({
                categories: foundCat._id
            }, options);

            return courses;
        }
        return null;

    }
    catch (e) {
        console.log(err);
        return null;
    }
};