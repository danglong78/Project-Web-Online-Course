const mongoose = require('mongoose');
const Schema = mongoose.schema;

const subCategorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const subCategory = mongoose.model('subCategory', subCategorySchema);

module.exports = subCategory;