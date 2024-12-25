import CustomRouter from "../../utils/CustomRouter.util.js";
import { createUser, readUsers, updateUser, destroyUser } from "../../controller/user.controller.js";

class UsersApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER", "ADMIN"], createUser);
    this.read("/", ["USER", "ADMIN"], readUsers);
    this.update("/:id", ["USER", "ADMIN"], updateUser);
    this.destroy("/:id", ["USER", "ADMIN"], destroyUser);
  };
}

const usersApiRouter = new UsersApiRouter();
export default usersApiRouter.getRouter();
