import UserModel from "./models/user.model.js";

class UsersController {
  constructor() {}
  //createOne
  createOne = async (data) => {
    const user = await UserModel.create(data);
    if (!user) {
      throw new Error("Failed to create user");
    }
    return user;
  };
  //readOnebyEmail
  readOnebyEmail = async (email) => {
    const user = await UserModel.findOne({ email }).lean();
    return user;
  };
  //readOnebyId
  readOnebyId = async (id) => {
    const user = await UserModel.findOne({ _id: id }).lean();
    return user;
  };
  //readAll
  readAll = async () => {
    const users = await UserModel.find().lean();
    return users.length ? users : {};
  };
  //updateOne
  updateOne = async (id, data) => {
    const options = { new: true };
    const user = await UserModel.findByIdAndUpdate(id, data, options);
    if (!user) {
      throw new Error("Failed to update user");
    }
    return user;
  };
  //deleteOne
  deleteOne = async (id) => {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };
}

export default UsersController;
