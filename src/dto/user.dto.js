import crypto from "crypto";

const { PERSISTENCE } = process.env;

class UserDTO {
  constructor(user) {
    if (!user) {
      throw new Error("User data is required");
    }
    PERSISTENCE !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.photo = user.photo;
    this.isOnline = user.isOnline;
    this.verifyCode = user.verifyCode;
    this.verify = user.verify;
    PERSISTENCE !== "mongo" && (this.createdAt = new Date());
    PERSISTENCE !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UserDTO;
