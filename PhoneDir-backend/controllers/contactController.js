const ContactModel = require("../models/contactModel");
const { ObjectId } = require("mongodb");

async function createNewContact(req, res) {
  try {
    const result = await ContactModel.create(req.body);
    return res
      .status(200)
      .send({ msg: "data is added Successfully", status: 200, result: result });
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function getAllContactById(req, res) {
  try {
    // let contact = await ContactModel.find({ userId: req.params.id });
    let id = req.params.id;
    let contact = await ContactModel.aggregate([
      { $match: { userId: id } },
      {
        $project: {
          groupId: { $toObjectId: "$groupId" },

          name: 1,
          email: 1,
          contact: 1,
          address: 1,
          userId: 1,
        },
      },
      {
        $sort: { name: 1 },
      },
      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group",
        },
      },
      {
        $unwind: "$group",
      },
    ]);
    return res.status(200).send({ msg: "success", result: contact });
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function getContactById(req, res) {
  try {
    let contact = await ContactModel.find({ _id: new ObjectId(req.params.id) });
    return res.status(200).send({ msg: "success", result: contact });
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function updeateContactById(req, res) {
  try {
    let contact = await ContactModel.findByIdAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    return res
      .status(200)
      .send({ msg: "success", status: 200, result: contact });
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function deleteContactById(req, res) {
  try {
    let contact = await ContactModel.findByIdAndDelete({
      _id: new ObjectId(req.params.id),
    });
    return res.status(200).send({ msg: "success", result: contact });
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function searchContactById(req, res) {
  const { userId, contectText } = req.params;
  // console.log("userId", userId);
  // console.log("context", contectText);
  try {
    let contact = await ContactModel.aggregate([
      {
        $match: {
          $and: [
            { userId: userId },

            {
              $or: [
                { name: { $regex: contectText } },
                { email: { $regex: contectText } },
                { contact: { $regex: contectText } },
                { address: { $regex: contectText } },
                { groupId: { $regex: contectText } },
              ],
            },
          ],
        },
      },
      {
        $project: {
          groupId: { $toObjectId: "$groupId" },
          name: 1,
          email: 1,
          contact: 1,
          address: 1,
          userId: 1,
        },
      },

      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group",
        },
      },
      {
        $unwind: "$group",
      },
    ]);

    console.log("contact---->", contact);
    return res
      .status(200)
      .send({ msg: "success", status: 200, result: contact });
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  getAllContactById,
  createNewContact,
  getContactById,
  searchContactById,
  updeateContactById,
  deleteContactById,
};
