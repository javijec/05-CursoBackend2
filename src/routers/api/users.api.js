import CustomRouter from "../../utils/CustomRouter.util.js";
import UserController from "../../controller/user.controller.js";

const controller = new UserController();

const { createOne, readOnebyEmail, readOnebyId, readAll, updateOne, deleteOne } = controller;

class UsersApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER", "ADMIN"], createOne);
    this.read("/", ["USER", "ADMIN"], readAll);
    this.update("/:id", ["USER", "ADMIN"], updateOne);
    this.destroy("/:id", ["USER", "ADMIN"], deleteOne);
  };
}

const usersApiRouter = new UsersApiRouter();
export default usersApiRouter.getRouter();
