const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const subCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = {model:subCategory};