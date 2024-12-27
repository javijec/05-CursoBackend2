import UserDTO from "../dto/user.dto.js";
import dao from "../dao/index.factory.js";

const { UsersManager } = dao;

class UserRepository {
  constructor() {
    this.manager = new UsersManager();
  }

  transformUser(userData) {
    if (!userData) return null;
    return new UserDTO(userData);
  }

  transformUsers(users) {
    if (!users || !Array.isArray(users)) return [];
    return users.map((user) => this.transformUser(user));
  }

  async createUserRepository(user) {
    const newUser = await this.manager.createUser(user);
    return this.transformUser(newUser);
  }

  async readUserbyEmailRepository(email) {
    const user = await this.manager.readUserbyEmail(email);
    return this.transformUser(user);
  }

  async readOnebyIdRepository(id) {
    const user = await this.manager.readUserbyId(id);
    return this.transformUser(user);
  }

  async readAllUsersRepository() {
    const users = await this.manager.readAllUsers();
    return this.transformUsers(users);
  }

  async updateUserRepository(id, data) {
    const updatedUser = await this.manager.updateUser(id, data);
    return this.transformUser(updatedUser);
  }

  async deleteUserRepository(id) {
    const deletedUser = await this.manager.deleteUser(id);
    return this.transformUser(deletedUser);
  }
}

export default UserRepository;
