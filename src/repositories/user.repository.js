import UserDTO from "../dto/user.dto.js";
import dao from "../dao/index.factory.js";

const { UsersManager } = dao;

class UserRepository {
  constructor() {
    this.manager = new UsersManager();
    this.dto = UserDTO;
  }
  createUserRepository = async (user) => {
    const newUser = await this.manager.createUser(user);
    return new this.dto(newUser);
  };
  readUserbyEmailRepository = async (email) => {
    console.log("repository");

    const user = await this.manager.readUserbyEmail(email);
    return new this.dto(user);
  };
  readOnebyIdRepository = async (id) => {
    const user = await this.manager.readOnebyId(id);
    return new this.dto(user);
  };
  readAllUsersRepository = async () => {
    const users = await this.manager.readAllUsers();
    console.log(users);
    return users.map((user) => new this.dto(user));
  };
  updateUserRepository = async (id, data) => {
    const updatedUser = await this.manager.updateUser(id, data);
    return new this.dto(updatedUser);
  };
  deleteUserRepository = async (id) => {
    const deletedUser = await this.manager.deleteUser(id);
    return new this.dto(deletedUser);
  };
}

export default UserRepository;
