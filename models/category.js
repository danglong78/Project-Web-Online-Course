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

module.exports = {
    model: Category
}