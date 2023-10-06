const { MongoClient } = require("mongodb");
const url = "mongodb://0.0.0.0:27017";
const dbName = "Phone-Directory";
const client = new MongoClient(url);

const getUser = async () => {
  let res = await client.connect();
  db = res.db(dbName);
  return (collection = db.collection("users"));
};

const getContact = async () => {
  let res = await client.connect();
  db = res.db(dbName);
  return (collection = db.collection("Contacts"));
};
const getGroup = async () => {
  let res = await client.connect();
  db = res.db(dbName);
  return (collection = db.collection("Groups"));
};

module.exports = { getUser, getContact, getGroup };
