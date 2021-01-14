const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const mainCategorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subCate: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subCategory' }]
});

mainCategorySchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });
const mainCategory = mongoose.model('MainCategory', mainCategorySchema);


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