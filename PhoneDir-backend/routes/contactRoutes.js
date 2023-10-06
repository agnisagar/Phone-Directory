const express = require("express");
const {
  getAllContactById,
  createNewContact,
  getContactById,
  searchContactById,
  updeateContactById,
  deleteContactById,
} = require("../controllers/contactController");

const router = express.Router();

router.route("/").post(createNewContact);
router.route("/getAllContact/:id").get(getAllContactById);
router.route("/searchContact/:contectText/:userId").get(searchContactById);
router.route("/deleteContact/:id").delete(deleteContactById);
router.route("/getContact/:id").get(getContactById);
router.route("/updateContact/:id").patch(updeateContactById);

module.exports = router;
