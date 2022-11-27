const { Router } = require("express");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser);

userRouter
  .route("/:userId")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

userRouter
  .route("/:userId/posts")
  .post(userController.createPostByUser)
  .get(userController.getPostsByUser);

module.exports = userRouter;
