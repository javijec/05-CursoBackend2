import { verifyHashUtil } from "../utils/hash.util.js";
import UserController from "../data/mongo/managers/users.controller.js";

const userController = new UserController();

async function verifyHash(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userController.readUserbyEmailController(email);
    const dbPass = user.password;
    const verify = verifyHashUtil(password, dbPass);
    if (verify) {
      return next();
    } else {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export default verifyHash;
