import UserRepository from "../repositories/user.repository.js";
import { createHashUtil } from "../utils/hash.util.js";
import crypto from "crypto";
import { sentResetPasswordEmail } from "../utils/nodemailer.util.js";

class AuthServices {
  constructor() {
    this.repository = new UserRepository();
  }
  veryfyService = async (email, verifyCodeFromClient) => {
    const user = await this.repository.readUserbyEmailRepository(email);
    if (user) {
      console.log(user);
      const { verifyCode } = user;
      console.log(verifyCode);
      console.log(verifyCodeFromClient);
      if (verifyCode === verifyCodeFromClient) {
        await this.repository.updateUserRepository(user.id, { verify: true });
        return true;
      } else {
        return false;
      }
    }
  };
  resetPasswordService = async (email) => {
    const user = await this.repository.readUserbyEmailRepository(email);
    if (user) {
      const verifyCode = crypto.randomBytes(16).toString("hex");
      await this.repository.updateUserRepository(user.id, { verifyCode });
      await sentResetPasswordEmail({ to: user.email, verifyCode });
      return true;
    } else {
      return false;
    }
  };
  newPasswordService = async (email, verifiedCodeUsed, password) => {
    const user = await this.repository.readUserbyEmailRepository(email);
    if (user) {
      const { verifyCode } = user;
      if (verifyCode === verifiedCodeUsed) {
        const hashedPassword = createHashUtil(password);
        await this.repository.updateUserRepository(user.id, { password: hashedPassword });
        return true;
      } else {
        return false;
      }
    }
  };
}

export default AuthServices;
