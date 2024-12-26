import UserModel from "./models/user.model.js";

class UsersManager {
  constructor() {}
  //createOne
  createUser = async (data) => {
    const user = await UserModel.create(data);
    if (!user) {
      throw new Error("Failed to create user");
    }
    return user;
  };
  //readOnebyEmail
  readUserbyEmail = async (email) => {
    console.log(email);
    const user = await UserModel.findOne({ email: email }).lean();
    return user;
  };
  //readOnebyId
  readUserbyId = async (id) => {
    const user = await UserModel.findOne({ _id: id }).lean();
    return user;
  };
  //readAll
  readAllUsers = async () => {
    const users = await UserModel.find().lean();
    return users.length ? users : {};
  };
  //updateOne
  updateUser = async (id, data) => {
    const options = { new: true };
    const user = await UserModel.findByIdAndUpdate(id, data, options);
    if (!user) {
      throw new Error("Failed to update user");
    }
    return user;
  };
  //deleteOne
  deleteUser = async (id) => {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };
}

export default UsersManager;
