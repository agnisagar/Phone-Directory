const mongoose = require("mongoose");
function dbConnect(url) {
  mongoose.connect(url).then(() => console.log("db connection successfull"));
}
module.exports = dbConnect;
