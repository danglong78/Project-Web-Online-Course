const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainCategorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subCate: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subCategory' }]
});

const mainCategory = mongoose.model('mainCategory', categorySchema);

var getMainCate = async function () {
    var cate = await mainCategory.find({ 'subCate.0': { "$exists": true } });
    if (cate.length == 0) {
        return null;
    }
    return cate;
}

module.exports = {
    model: mainCategory,
    GetMainCate: getMainCate
}