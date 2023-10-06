const { getUser } = require("./dbConnection");

async function newUser(userData) {
  const User = await getUser();
  let res = await User.insertOne(userData);
  return res;
}
async function getUserByEmail(userEmail) {
  const User = await getUser();
  let res = await User.findOne(userEmail);
  return res;
}
async function checkLogin(email1, password1) {
  const User = await getUser();
  let res = await User.findOne({ email: email1, password: password1 });
  return res;
}
module.exports = { newUser, getUserByEmail, checkLogin };
