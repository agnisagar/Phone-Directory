const UserModel = require("../models/userModel");
const { ObjectId } = require("mongodb");
var jwt = require("jsonwebtoken");
const jwtKey = "placementadda";

async function createNewUser(req, res) {
  try {
    let user = await UserModel.create(req.body);
    return res.status(200).send({ msg: "success", status: 200, result: user });
  } catch (err) {
    return res.status(409).json(err);
  }
}

async function checkLogin(req, res) {
  try {
    let user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user == null) {
      return res
        .status(400)
        .send({ msg: `email id or password is wrong`, result: "" });
    } else {
      let token = jwt.sign({ name: "abc" }, jwtKey, { expiresIn: "1h" });

      res
        .status(200)
        .send({ msg: `success`, status: 200, result: user, token: token });
      // console.log("==toekn==", token);
    }
  } catch (err) {
    return res.status(409).json(err);
  }
}
// async function updeateUserById(req, res) {
//   try {
//     let user = await UserModel.findByIdAndUpdate(
//       { _id: new ObjectId(req.params.id) },
//       { $set: req.body }
//     );
//     return res.status(200).send({ msg: "success", result: user });
//   } catch (err) {
//     return res.status(409).json(err);
//   }
// }

// async function deleteUserById(req, res) {
//   try {
//     let user = await UserModel.findByIdAndDelete(req.params.id);
//     return res.status(200).send({ msg: "success", result: user });
//   } catch (err) {
//     return res.status(409).json(err);
//   }
// }

module.exports = { checkLogin, createNewUser };
