import CustomRouter from "../../utils/CustomRouter.util.js";
import UserController from "../../controller/user.controller.js";

const controller = new UserController();

const { createUserController, readAllUsersController, updateUserController, deleteUserController } = controller;

class UsersApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createUserController);
    this.read("/", ["ADMIN"], readAllUsersController);
    this.update("/:id", ["USER", "ADMIN"], updateUserController);
    this.destroy("/:id", ["USER", "ADMIN"], deleteUserController);
  };
}

const usersApiRouter = new UsersApiRouter();
export default usersApiRouter.getRouter();
