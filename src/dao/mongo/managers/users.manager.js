import UserModel from "./models/user.model.js";

class UsersController {
  constructor() {}
  createUser = async (data) => {
    const user = await UserModel.create(data);
    if (!user) {
      throw new Error("Failed to create user");
    }
    return user;
  };

  readOneByEmail = async (email) => {
    const user = await UserModel.findOne({ email }).lean();
    return user;
  };

  readById = async (id) => {
    const one = await UserModel.findOne({ _id: id }).lean();
    return one;
  };

  readAll = async () => {
    const users = await UserModel.find().lean();
    return users.length ? users : {};
  };

  updateUser = async (id, data) => {
    const options = { new: true };
    const user = await UserModel.findByIdAndUpdate(id, data, options);
    if (!user) {
      throw new Error("Failed to update user");
    }
    return user;
  };

  destroyUser = async (id) => {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };
}

export default UsersController;
