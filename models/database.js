const mongoose = require('mongoose');
const dbUrl = process.env.NODE_ENV !== "production"?'mongodb://localhost:27017/udemyclone':"mongodb+srv://pm_bibeobu:77777777@cluster0.6ilwa.mongodb.net/udemyclone?retryWrites=true&w=majority";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }


module.exports = {
    connect: () => {
        return mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false

        });
    }
}