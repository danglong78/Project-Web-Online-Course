const Cate = require('../../models/category').model;
const SubCate = require('../../models/subCategory').model;
const course = require('../../models/course').model;
//const GetMainCate = require('../../models/category').GetMainCate;

const admin_Cate_View = async function (res) {
    try {
        let main_cate = await Cate.find();
        let sub_cate = await SubCate.find();
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
        res.render('admin/category', { category: category, subCategory: sub_cate,statics:__statics });
    } catch (e) {
        res.render('error');
    }
}

const rename_MainCate = async function (req, res) {
    const id = req.body.id;
    const new_name = req.body.name;
    var aCate = await Cate.findById(id);
    aCate.name = new_name;
    Cate.updateOne({ _id: id }, { $set: aCate }).exec();
    res.send({ success: true });
};

const add_MainCate = async function (req, res) {
    var temp = await Cate.find({ name: req.body.name });
    //var aCate = await cateModel.findById(req.body.id);
    if (temp.length > 0) {
        res.send({ success: false });
        return;
    }
    else {
        let cate = new Cate({ name: req.body.name, subCate: [] })
        try {
            await cate.save();
        } catch (err) {

            res.send({ success: false })
            throw err;
            //return;
        }
        res.send({ success: true, cateID: cate._id })
    }
}

const add_SubCate = async function (req, res) {
    var temp = await SubCate.find({ name: req.body.name });
    //var aCate = await cateModel.findById(req.body.id);
    if (temp.length > 0) {
        res.send({ success: false });
        return;
    }
    else {
        let cate = new SubCate({ name: req.body.name })
        try {
            await cate.save();
        } catch (err) {

            res.send({ success: false })
            throw err;
            //return;
        }
        res.send({ success: true, cateID: cate._id })
    }
}

const rename_SubCate = async function (req, res) {
    const id = req.body.id;
    const new_name = req.body.name;
    var aCate = await SubCate.findById(id);
    aCate.name = new_name;
    SubCate.updateOne({ _id: id }, { $set: aCate }).exec();
    res.send({ success: true });
};

const del_Main_cate = async function (req, res) {
    const id = req.body.id;
    var aCate = await Cate.findById(id);
    if (aCate.subCate.length > 0) {
        res.send({ success: false });
    }
    try {
        Cate.findByIdAndDelete(id).exec();
        res.send({ success: true });
    } catch (err) {
        res.send({ success: false });
        throw (err);
    }
};

const add_Subcate_to_Maincate = async function (req, res) {
    const main_id = req.body.idMain;
    const sub_id = req.body.idSubCate;
    var aCate = await Cate.findById(main_id);
    for (var i = 0; i < aCate.subCate.length; i++) {
        if (aCate.subCate[i] == sub_id) {
            res.send({ success: false });
            return;
        }
    }
    aCate.subCate.push(sub_id);
    Cate.updateOne({ _id: main_id }, { $set: aCate }).exec();
    res.send({ success: true });
};

const del_subcate = async function (req, res) {
    const id = req.body.id;
    var coure_list = await course.find({ subCategory: id });
    var Cate_list = await Cate.find({ subCate: id });
    if (coure_list.length > 0) {
        res.send({ success: false });
        return;
    }
    for (var i = 0; i < Cate_list.length; i++) {
        var temp = [];
        for (var z = 0; z < Cate_list[i].subCate.length; z++) {
            if (Cate_list[i].subCate[z] != id) {
                temp.push(Cate_list[i].subCate[z]);
            }
        }
        Cate_list[i].subCate = temp;
        Cate.updateOne({ _id: Cate_list[i]._id }, { $set: Cate_list[i] }).exec();
    }
    SubCate.findByIdAndDelete(id).exec();
    res.send({ success: true });
};

const change_subcate = async function (req, res) {
    const main_id = req.body.idMain;
    const sub_id_pre = req.body.oldIDSubCate;
    const sub_id_pos = req.body.newIDSubCate;
    var course_list = await course.find({ category: main_id, subCategory: sub_id_pre });
    if (course_list.length > 0) {
        res.send({ success: false });
        return;
    }
    var aCate = await Cate.findById(main_id);
    for (var i = 0; i < aCate.subCate.length; i++) {
        if (aCate.subCate[i] == sub_id_pre) {
            aCate.subCate[i] = sub_id_pos;
            break;
        }
    }
    Cate.updateOne({ _id: main_id }, { $set: aCate }).exec();
    res.send({ success: true });
};

const dell_subcate_from_main = async function (req, res) {
    const idsub = req.body.idSub;
    const idmain = req.body.idMain;
    var course_list = await course.find({ category: idmain, subCategory: idsub });
    if (course_list.length > 0) {
        res.send({ success: false });
        return;
    }
    var aCate = await Cate.findById(idmain);
    var temp = [];
    for (var i = 0; i < aCate.subCate.length; i++) {
        if (aCate.subCate[i] != idsub) {
            temp.push(aCate.subCate[i]);
        }
    }
    aCate.subCate = temp;
    Cate.updateOne({ _id: idmain }, { $set: aCate }).exec();
    res.send({ success: true });
};

module.exports = {
    admin_Cate_View: admin_Cate_View,
    admin_add_Main_cate: add_MainCate,
    admin_rename_Main_cate: rename_MainCate,
    admin_add_Sub_cate: add_SubCate,
    admin_rename_Sub_cate: rename_SubCate,
    admin_del_Main_cate: del_Main_cate,
    admin_add_Subcate_to_Maincate: add_Subcate_to_Maincate,
    admin_del_Subcate: del_subcate,
    admim_change_subcate: change_subcate,
    admin_del_subcate_from_maincate: dell_subcate_from_main
}