import { model, Schema } from "mongoose";

const collection = "users";

const schema = new Schema({
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
  photo: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
  isOnline: { type: Boolean, default: false },
  verifyCode: { type: String, default: null },
  verify: { type: Boolean, default: false },
});

const UserModel = model(collection, schema);
export default UserModel;
