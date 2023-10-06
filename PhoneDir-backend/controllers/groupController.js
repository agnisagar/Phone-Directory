const groupModel = require("../models/groupModel");
const { ObjectId } = require("mongodb");

async function createNewGroup(req, res) {
  try {
    let group = await groupModel.create(req.body);

    return res.status(200).send({ msg: "success", status: 200, result: group });
  } catch (err) {
    return res.status(409).json(err);
  }
}

async function getAllGroup(req, res) {
  try {
    let group = await groupModel.find({ userId: req.params.id });
    return res.status(200).send({ msg: "success", status: 200, result: group });
  } catch (err) {
    return res.status(409).json(err);
  }
}
async function updeateGroupById(req, res) {
  try {
    let user = await groupModel.findByIdAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    return res.status(200).send({ msg: "success", result: user });
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function deleteGroupById(req, res) {
  console.log("id", req.params.id);
  try {
    let user = await groupModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({ msg: "success", result: user });
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  getAllGroup,
  createNewGroup,
  updeateGroupById,
  deleteGroupById,
};
