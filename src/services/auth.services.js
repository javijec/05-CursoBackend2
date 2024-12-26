import UserRepository from "../repositories/user.repository.js";

class AuthServices {
  constructor() {
    this.repository = new UserRepository();
  }
  veryfyService = async (email, verifyCodeFromClient) => {
    const user = await this.repository.readUserbyEmailRepository(email);
    if (user) {
      const { verifyCode } = user;
      if (verifyCode === verifyCodeFromClient) {
        await this.repository.updateUserRepository(user._id, { verified: true });
        return true;
      } else {
        return false;
      }
    }
  };
}

export default AuthServices;
