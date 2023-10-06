// middleware
const middleware = (req, res, next) => {
  console.log("Hello my middleware");
  next();
};
function postUsers(req, res) {
  res.status(200).json({ result: "Post Success" });
}
function getUsers(req, res) {
  res.status(200).json({ result: "getUsers Success" });
}

function updateUsers(req, res) {
  res.status(200).json({ result: "updateUsers Success" });
}

function deleteUsers(req, res) {
  res.status(200).json({ result: "deleteUsers Success" });
}
module.exports = { postUsers, getUsers, updateUsers, deleteUsers, middleware };
