import UserDTO from "../dto/user.dto.js";
import dao from "../dao/index.factory.js";

const { UsersManager } = dao;

class UserRepository {
  constructor() {
    this.manager = new UsersManager();
    this.dto = UserDTO;
  }
  createOne = async (user) => {
    const newUser = await this.manager.createOne(user);
    return new this.dto(newUser);
  };
  readOnebyEmail = async (email) => {
    const user = await this.manager.readOnebyEmail(email);
    return new this.dto(user);
  };
  readOnebyId = async (id) => {
    const user = await this.manager.readOnebyId(id);
    return new this.dto(user);
  };
  readAll = async () => {
    const users = await this.manager.readAll();
    return users.map((user) => new this.dto(user));
  };
  updateOne = async (id, data) => {
    const updatedUser = await this.manager.updateOne(id, data);
    return new this.dto(updatedUser);
  };
  deleteOne = async (id) => {
    const deletedUser = await this.manager.deleteOne(id);
    return new this.dto(deletedUser);
  };
}

export default UserRepository;
