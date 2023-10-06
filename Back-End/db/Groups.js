const { getGroup } = require("./dbConnection");

async function newGroup(groupData) {
  const Group = await getGroup();
  let res = await Group.insertOne(groupData);
  return res;
}

async function getAllGroup(userId) {
  const Group = await getGroup();
  let res = await Group.find({ userId: userId }).toArray();
  return res;
}

module.exports = { newGroup, getAllGroup };
