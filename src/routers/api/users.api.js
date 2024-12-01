import { Router } from "express";
import UsersController from "../../data/mongo/managers/users.controller.js";

const usersApiRouter = Router();
const userController = new UsersController();

usersApiRouter.post("/", createUser);
usersApiRouter.get("/", readUsers);
usersApiRouter.put("/:id", updateUser);
usersApiRouter.delete("/:id", destroyUser);

export default usersApiRouter;

async function createUser(req, res, next) {
  try {
    const message = "USER CREATED";
    const data = req.body;
    const response = await userController.create(data);
    return res.status(201).json({ response, message });
  } catch (error) {
    return next(error);
  }
}
async function readUsers(req, res, next) {
  try {
    const message = "USERS FOUND";
    const response = await userController.read();
    return res.status(200).json({ response, message });
  } catch (error) {
    return next(error);
  }
}
async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const message = "USER UPDATED";
    const response = await userController.update(id, data);
    return res.status(200).json({ response, message });
  } catch (error) {
    return next(error);
  }
}
async function destroyUser(req, res, next) {
  try {
    const { id } = req.params;
    const message = "USER DELETED";
    const response = await userController.destroy(id);
    return res.status(200).json({ response, message });
  } catch (error) {
    return next(error);
  }
}
