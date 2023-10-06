const express = require("express");
const {
  getAllGroup,
  createNewGroup,
  updeateGroupById,
  deleteGroupById,
} = require("../controllers/groupController");

const router = express.Router();

router.route("/").post(createNewGroup);
router.route("/getAllGroup/:id").get(getAllGroup);

router
  .route("/deleteGroup/:id")
  // .patch(updeateGroupById)
  .delete(deleteGroupById);
module.exports = router;
