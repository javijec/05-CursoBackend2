import dbConnect from "../utils/dbConnect.util.js";

const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  default:
    console.log("connecting to mongodb");
    dbConnect();
    const { default: CartManagerMongo } = await import("./mongo/managers/carts.manager.js");
    const { default: ProductMamangerMongo } = await import("./mongo/managers/products.manager.js");
    const { default: UsersManagerMongo } = await import("./mongo/managers/users.manager.js");
    dao = { ProductsManager: ProductMamangerMongo, UsersManager: UsersManagerMongo, CartManager: CartManagerMongo };
    break;
}

export default dao;
