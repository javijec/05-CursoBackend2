import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import AuthController from "../../controller/auth.controller.js";

const authcontroller = new AuthController();

const { registerController, loginController, signoutController, onlineController, veryfyController } = authcontroller;

class AuthApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), registerController);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginController);
    this.create("/signout", ["USER", "ADMIN"], passportCb("signout"), signoutController);
    this.create("/online", ["USER", "ADMIN"], passportCb("online"), onlineController);
    this.create("/veriry", ["PUBLIC"], veryfyController);
  };
}

const authRouter = new AuthApiRouter();
export default authRouter.getRouter();
