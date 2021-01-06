const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminChema = Schema({
    name: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('Admin', adminChema);

module.exports = {
    model: Admin
}