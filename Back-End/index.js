const express = require("express");
var bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
var jwt = require("jsonwebtoken");
const jwtKey = "placementadda";
const PORT = 5000;
const { newUser, getUserByEmail, checkLogin } = require("./db/Users");
const {
  newContact,
  getAllContact,
  deleteContact,
  getContactById,
  updateContact,
  searchContect,
} = require("./db/Contact");
const { newGroup, getAllGroup } = require("./db/Groups");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/signup", async (req, res) => {
  let user = await getUserByEmail({ email: req.body.email });

  if (user == null) {
    user = await newUser(req.body);
    res.send({
      msg: `success`,
      status: 200,
      data: user,
    });
  } else {
    res.send({
      msg: `${req.body.email} already exists`,
      status: 201,
      data: "",
    });
  }
});

app.post("/login", async (req, res) => {
  let user = await checkLogin(req.body.email, req.body.password);
  if (user == null) {
    res.send({ msg: `email id or password is wrong`, status: 201, data: "" });
  } else {
    let token = jwt.sign({ name: "abc" }, jwtKey, { expiresIn: "1h" });
    res.send({ msg: `success`, status: 200, data: user, token: token });
    // console.log(token);
  }
});

app.post("/addContact", verifyToken, async (req, res) => {
  let contact = await newContact(req.body);
  // console.log(contact);
  if (contact.acknowledged == false) {
    res.send({ msg: ` Something went worng`, status: 201, data: contact });
  } else {
    res.send({ msg: `success`, status: 200, data: contact });
  }
});

app.get("/getContacts/:id", async (req, res) => {
  let contact = await getAllContact({ userId: req.params.id });
  // console.log(contact);
  res.send({ msg: `success`, status: 200, data: contact });
  // console.log(contact);
});

app.delete("/deleteContact/:id", verifyToken, async (req, res) => {
  let result = await deleteContact({
    _id: new ObjectId(req.params.id),
  });
  // console.log(result);
  res.send({
    msg: `success`,
    status: 200,
    data: result,
  });
});

app.get("/getContactById/:id", async (req, res) => {
  let contact = await getContactById({ _id: new ObjectId(req.params.id) });
  // console.log(contact);
  if (contact) {
    res.send({ msg: `success`, status: 200, data: contact });
  } else {
    res.send({ msg: `not contact  found`, status: 201, data: contact });
  }
});
app.put("/updateContact/:id", verifyToken, async (req, res) => {
  let contact = await updateContact(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  // console.log(contact);
  if (contact.acknowledged == false) {
    res.send({ msg: `something went wrong`, status: 201, data: contact });
  } else {
    res.send({ msg: `success`, status: 200, data: contact });
  }
  console.log(contact);
});
app.get("/searchContact/:contectText/:userId", async (req, res) => {
  let contects = await searchContect(req.params.userId, req.params.contectText);
  if (contects) {
    res.send({ msg: "success", status: 200, data: contects });
  } else {
    res.send({ msg: "No contect found", status: 201, data: contects });
  }
});
function verifyToken(req, res, next) {
  let token = req.headers["token"];
  // console.log(token);
  if (token) {
    jwt.verify(token, jwtKey, (err, result) => {
      if (err) {
        res.status(401).send({ msg: "invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ msg: " token can not we match" });
  }
}

///  GROUPS

app.post("/addGroup", verifyToken, async (req, res) => {
  let Group = await newGroup(req.body);
  // console.log(contact);
  if (Group.acknowledged == false) {
    res.send({ msg: ` Something went worng`, status: 201, data: Group });
  } else {
    res.send({ msg: `success`, status: 200, data: Group });
    console.log(Group);
  }
});
app.get("/getGroups/:id", async (req, res) => {
  let Groups = await getAllGroup(req.params.id);
  // console.log(contact);
  res.send({ msg: `success`, status: 200, data: Groups });
});
// app.get("/searchContactByGroup/:groupId/:userId", async (req, res) => {
//   let contects = await searchContactByGroup(
//     req.params.userId,
//     req.params.groupId
//   );
//   if (contects) {
//     res.send({ msg: "success", status: 200, data: contects });
//   } else {
//     res.send({ msg: "No contect found", status: 201, data: contects });
//   }
// });

app.listen(PORT, () => console.log(`Server is Running at ${PORT} port`));
