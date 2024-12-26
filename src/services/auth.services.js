import UserRepository from "../repositories/user.repository.js";

class AuthServices {
  constructor() {
    this.repository = new UserRepository();
  }
  veryfy = async (email, verifyCodeFromClient) => {
    const user = await readOnebyEmail(email);
    if (user) {
      const { verifyCode } = user;
      if (verifyCode === verifyCodeFromClient) {
        await updateOne(user._id, { verified: true });
        return true;
      } else {
        return false;
      }
    }
  };
}

export default AuthServices;
