import UserModel from "../models/user.model.js";

class UsersController {
  constructor() {}
  createUser = async (data) => {
    try {
      const user = await UserModel.create(data);
      if (!user) {
        throw new Error("Failed to create user");
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  readOneByEmail = async (email) => {
    try {
      const user = await UserModel.findOne({ email }).lean();
      return user;
    } catch (error) {
      throw error;
    }
  };

  readById = async (id) => {
    try {
      const one = await UserModel.findOne({ _id: id }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  };

  readAll = async () => {
    try {
      const users = await UserModel.find().lean();
      return users.length ? users : {};
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (id, data) => {
    try {
      const options = { new: true };
      const user = await UserModel.findByIdAndUpdate(id, data, options);
      if (!user) {
        throw new Error("Failed to update user");
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  destroyUser = async (id) => {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
}

export default UsersController;
