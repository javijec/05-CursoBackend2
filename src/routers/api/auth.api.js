import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class AuthApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", passportCb("register"), register);
    this.create("/login", passportCb("login"), login);
    this.create("/signout", passportCb("signout"), signout);
    this.create("/online", passportCb("online"), online);
  };
}

const authRouter = new AuthApiRouter();
export default authRouter.getRouter();

async function register(req, res, next) {
  const user = req.user;
  const response = await user._id;
  const message = "USER REGISTERED";
  return res.json201(response, message);
}
async function login(req, res, next) {
  const user = req.user;
  const response = user._id;
  const message = "USER LOGGED IN";
  return res.cookie("token", user.token).json200(response, message);
}
async function signout(req, res, next) {
  const response = req.user._id;
  const message = "USER LOGGED OUT";
  return res.cookie("token", req.user.token, { maxAge: 1 }).json200(response, message);
}
async function online(req, res, next) {
  const response = req.user.email;
  const message = "USER IS ONLINE";
  return res.json200(response, message);
}
