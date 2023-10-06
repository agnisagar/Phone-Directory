const { getContact } = require("./dbConnection");

async function newContact(userContact) {
  const contact = await getContact();
  let res = await contact.insertOne(userContact);
  return res;
}

//  use Aggregate function getAllContact with group data
async function getAllContact(condition) {
  const contact = await getContact();
  let res = await contact
    .aggregate([
      { $match: condition },
      {
        $project: {
          groupId: { $toObjectId: "$groupId" },
          _id: 1,
          name: 1,
          email: 1,
          contact: 1,
          address: 1,
          userId: 1,
        },
      },
      {
        $lookup: {
          from: "Groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group",
        },
      },
      {
        $unwind: "$group",
      },
    ])
    .toArray();
  return res;
}
// Normol getAllContact Function
/*async function getAllContact(condition) {
  const contact = await getContact();
  let res = await contact.find(condition).toArray();
  // console.log(res);
  return res;
}*/

async function deleteContact(id) {
  const contact = await getContact();
  let res = await contact.deleteOne(id);
  return res;
}

// async function getContactById(idObj) {
//   const contact = await getContact();
//   let res = await contact.findOne(idObj);
//   return res;
// }
async function getContactById(idObj) {
  const contact = await getContact();
  let res = await contact
    .aggregate([
      { $match: idObj },
      {
        $project: {
          groupId: { $toObjectId: "$groupId" },
          _id: 1,
          name: 1,
          email: 1,
          contact: 1,
          address: 1,
          userId: 1,
        },
      },
      {
        $lookup: {
          from: "Groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group",
        },
      },
    ])
    .toArray();
  return res;
}

async function updateContact(condition, data) {
  const contact = await getContact();
  let res = await contact.updateOne(condition, data);
  return res;
}

async function searchContect(userId, searchText) {
  const contact = await getContact();
  let res = contact
    .aggregate([
      {
        $match: {
          $and: [
            { userId: userId },
            {
              $or: [
                { name: { $regex: searchText } },
                { email: { $regex: searchText } },
                { contact: { $regex: searchText } },
                { address: { $regex: searchText } },
                { groupId: { $regex: searchText } },
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
          from: "Groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group",
        },
      },
      {
        $unwind: "$group",
      },
    ])
    .toArray();
  return res;
}

module.exports = {
  newContact,
  getAllContact,
  deleteContact,
  getContactById,
  updateContact,
  searchContect,
};
