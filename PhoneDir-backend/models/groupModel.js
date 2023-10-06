const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema(
  {
    group_name: {
      type: String,
      require: true,
      unique: true,
    },
    userId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const groupModel = mongoose.model("groups", groupSchema);
module.exports = groupModel;
