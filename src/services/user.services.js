import UserRepository from "../repositories/user.repository.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  createOne = async (user) => {
    const newUser = await this.repository.createOne(user);
    return newUser;
  };
  readOnebyEmail = async (email) => {
    const user = await this.repository.readOnebyEmail(email);
    return user;
  };
  readOnebyId = async (id) => {
    const user = await this.repository.readOnebyId(id);
    return user;
  };
  readAll = async () => {
    const users = await this.repository.readAll();
    return users;
  };
  updateOne = async (id, data) => {
    const updatedUser = await this.repository.updateOne(id, data);
    return updatedUser;
  };
  deleteOne = async (id) => {
    const deletedUser = await this.repository.deleteOne(id);
    return deletedUser;
  };
}

export default UserService;
