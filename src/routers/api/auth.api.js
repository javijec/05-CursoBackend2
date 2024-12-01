import { Router } from "express";
import passportCb from "../../middlewares/passportCb.mid.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", passportCb("register"), register);
sessionsRouter.post("/login", passportCb("login"), login);
sessionsRouter.post("/signout", passportCb("signout"), signout);
sessionsRouter.post("/online", passportCb("online"), online);

export default sessionsRouter;

async function register(req, res, next) {
  try {
    const user = req.user;
    return res.status(201).json({ message: "USER REGISTERED", user_id: user._id });
  } catch (error) {
    return next(error);
  }
}
async function login(req, res, next) {
  try {
    const user = req.user;
    return res.status(200).cookie("token", user.token).json({ message: "USER LOGGED IN", user_id: user._id });
  } catch (error) {
    return next(error);
  }
}
async function signout(req, res, next) {
  try {
    return res.status(200).cookie("token", req.user.token, { maxAge: 1 }).json({ message: "USER LOGGED OUT" });
  } catch (error) {
    return next(error);
  }
}
async function online(req, res, next) {
  try {
    return res.status(200).json({ message: req.user.email.toUpperCase() + " IS ONLINE", online: true });
  } catch (error) {
    return next(error);
  }
}
