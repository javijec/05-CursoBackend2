import e from "express";
import UserService from "../services/user.services.js";

class UserController {
  constructor() {
    this.service = new UserService();
  }
  createOne = async (req, res) => {
    const user = req.body;
    const newUser = await this.service.createOne(user);
    const response = newUser;
    const message = "User created successfully";
    return res.json201(response, message);
  };
  readOnebyEmail = async (req, res) => {
    const email = req.params.email;
    const user = await this.service.readOnebyEmail(email);
    const response = user;
    const message = "User retrieved successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  readOnebyId = async (req, res) => {
    const id = req.params.id;
    const user = await this.service.readOnebyId(id);
    const response = user;
    const message = "User retrieved successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  readAll = async (req, res) => {
    const users = await this.service.readAll();
    const response = users;
    const message = "Users retrieved successfully";
    if (response.length > 0) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };

  updateOne = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updatedUser = await this.service.updateOne(id, data);
    const response = updatedUser;
    const message = "User updated successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  deleteOne = async (req, res) => {
    const id = req.params.id;
    const deletedUser = await this.service.deleteOne(id);
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
