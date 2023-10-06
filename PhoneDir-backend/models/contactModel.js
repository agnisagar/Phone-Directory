const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      // unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    contact: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    groupId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const ContactModel = mongoose.model("contacts", contactSchema);
module.exports = ContactModel;
