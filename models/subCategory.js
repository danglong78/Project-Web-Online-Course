const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const subCategorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

subCategorySchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });
const subCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = {model:subCategory};