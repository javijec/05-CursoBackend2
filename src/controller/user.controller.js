import UserService from "../services/user.services.js";

class UserController {
  constructor() {
    this.service = new UserService();
  }
  createUserController = async (req, res) => {
    const user = req.body;
    const newUser = await this.service.createUserServices(user);
    const response = newUser;
    const message = "User created successfully";
    return res.json201(response, message);
  };
  readUserbyEmailController = async (req, res) => {
    const email = req.params.email;
    console.log("controller");
    const user = await this.service.readUserbyEmailServices(email);
    const response = user;
    const message = "User retrieved successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  readOnebyIdController = async (req, res) => {
    const id = req.params.id;
    const user = await this.service.readOnebyIdServices(id);
    const response = user;
    const message = "User retrieved successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  readAllUsersController = async (req, res) => {
    const users = await this.service.readAllUsersServices();
    const response = users;
    const message = "Users retrieved successfully";
    if (response.length > 0) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };

  updateUserController = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updatedUser = await this.service.updateUserServices(id, data);
    const response = updatedUser;
    const message = "User updated successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  deleteUserController = async (req, res) => {
    const id = req.params.id;
    const deletedUser = await this.service.deleteUserServices(id);
    const response = deletedUser;
    const message = "User deleted successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
}

export default UserController;
