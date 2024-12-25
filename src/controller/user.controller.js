import UsersController from "../data/mongo/managers/users.manager.js";

const userController = new UsersController();

async function createUser(req, res, next) {
  const data = req.body;
  const response = await userController.create(data);
  const message = "User created successfully";
  return res.json201(response, message);
}
async function readUsers(req, res, next) {
  const response = await userController.read();
  const message = "Users retrieved successfully";
  return res.json200(response, message);
}
async function updateUser(req, res, next) {
  const { id } = req.params;
  const data = req.body;
  const response = await userController.update(id, data);
  const message = "User updated successfully";
  return res.json200(response, message);
}
async function destroyUser(req, res, next) {
  const { id } = req.params;
  const response = await userController.destroy(id);
  const message = "User deleted successfully";
  return res.json200(response, message);
}

export { createUser, readUsers, updateUser, destroyUser };
