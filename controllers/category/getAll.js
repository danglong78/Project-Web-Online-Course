const categoryModel= require('../../models/category').model;
const subCategoryModel = require('../../models/subCategory').model;

const getAllCate= async ()=>{
    let maincategory = await categoryModel.find();
    let category=[];
    for (const i of maincategory) {
        let subCategory = await subCategoryModel.find({_id: i.subCate});
        category.push({_id:i._id,name: i.name,subCategory})
    }
    return category;
}
module.exports= getAllCate