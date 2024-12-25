import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import AuthController from "../../controller/auth.controller.js";

const controller = new AuthController();

const { register, login, signout, online } = controller;

class AuthApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/signout", ["USER", "ADMIN"], passportCb("signout"), signout);
    this.create("/online", ["USER", "ADMIN"], passportCb("online"), online);
  };
}

const authRouter = new AuthApiRouter();
export default authRouter.getRouter();
