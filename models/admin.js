const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminChema = Schema({
    name: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('admin', adminChema);

module.exports = {
    nodel: Admin
}