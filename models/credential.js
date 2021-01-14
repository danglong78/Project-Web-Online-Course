const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const credentialSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  googleID: {
    type: String,
  },

  facebookID: {
    type: String,
  },

  role: {
    type: String,
    required: true,
    enum: ["Student", "Lecturer", "Admin"],
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "role",
  },

  isVerified: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
});

const Credential = mongoose.model("Credential", credentialSchema);

module.exports = {
  model: Credential,
};
