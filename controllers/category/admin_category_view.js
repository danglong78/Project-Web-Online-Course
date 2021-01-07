const Cate = require('../../models/category').model;
const SubCate = require('../../models/subCategory').model
const GetMainCate = require('../../models/category').GetMainCate;

const admin_Cate_View = async function (res) {
    try {
        let main_cate = await Cate.find();
        let sub_cate= await SubCate.find();
        if (main_cate.length == 0) {
            res.render('error');
            return;
        }
        var category = [];
        for (var i = 0; i < main_cate.length; i++) {
            let name = main_cate[i].name;
            var subcate = [];
            for (var z = 0; z < main_cate[i].subCate.length; z++) {
                let temp = await SubCate.findById(main_cate[i].subCate[z]._id);
                subcate.push({
                    _id: temp._id,
                    name: temp.name
                });
            }
            category.push({
                _id: main_cate[i]._id,
                name: name,
                subCate: subcate
            });
        }
        res.render('admin/category', { category: category ,subCategory:sub_cate});
    } catch (e) {
        res.render('error');
    }
}

module.exports = {
    admin_Cate_View: admin_Cate_View
}