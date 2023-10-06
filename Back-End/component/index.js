const express = require("express");
const app = express();
const {
  postUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  middleware,
} = require("./users");
const PORT = 8000;

app
  .route("/api/users")

  .post(middleware, postUsers)
  .get(middleware, getUsers);
app
  .route("/api/users/:id")

  .patch(middleware, updateUsers)
  .delete(middleware, deleteUsers);

app.listen(PORT, () => console.log(`Server is Running at ${PORT} port`));
