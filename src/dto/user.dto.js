import crypto from "crypto";

const { PERSISTENCE } = process.env;

class UserDTO {
  constructor(user) {
    PERSISTENCE !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.photo = user.photo;
    this.isOnline = user.isOnline;
  }
}

export default UserDTO;
