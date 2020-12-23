const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subCate: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }]
});

const Category = mongoose.model('category', categorySchema);

var getMainCate = async function () {
    var cate = await Category.find({ 'subCate.0': { "$exists": true } });
    if (cate.length == 0) {
        return null;
    }
    return cate;
}

module.exports = {
    model: Category,
    GetMainCate: getMainCate
}