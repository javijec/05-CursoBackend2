import UserRepository from "../repositories/user.repository.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  createUserServices = async (user) => {
    const newUser = await this.repository.createUserRepository(user);
    return newUser;
  };
  readUserbyEmailServices = async (email) => {
    const user = await this.repository.readUserbyEmailRepository(email);
    return user;
  };
  readOnebyIdServices = async (id) => {
    const user = await this.repository.readOnebyIdRepository(id);
    return user;
  };
  readAllUsersServices = async () => {
    const users = await this.repository.readAllUsersRepository();
    return users;
  };
  updateUserServices = async (id, data) => {
    const updatedUser = await this.repository.updateUserRepository(id, data);
    return updatedUser;
  };
  deleteUserServices = async (id) => {
    const deletedUser = await this.repository.deleteUserRepository(id);
    return deletedUser;
  };
}

export default UserService;
