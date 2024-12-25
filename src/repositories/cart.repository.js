import CartDTO from "../dto/cart.dto.js";
import { CartManager } from "../dao/index.factory.js";

class CartRepository {
  constructor() {
    this.manager = new CartManager();
    this.dto = CartDTO;
  }
  createOne = async (user_id) => {
    const newCart = await this.manager.createOne(user_id);
    return new this.dto(newCart);
  };
  readAll = async () => {
    const carts = await this.manager.readAll();
    return carts.map((cart) => new this.dto(cart));
  };

  readOne = async (cid) => {
    const cart = await this.manager.readOne(cid);
    return new this.dto(cart);
  };
  updateOne = async (cid, pid, quantity) => {
    const updatedCart = await this.manager.updateOne(cid, pid, quantity);
    return new this.dto(updatedCart);
  };
  updateMany = async (cid, products) => {
    const updatedCart = await this.manager.updateMany(cid, products);
    return new this.dto(updatedCart);
  };
  addOne = async (cid, { product, quantity = 1 }) => {
    const addedCart = await this.manager.addOne(cid, { product, quantity });
    return new this.dto(addedCart);
  };
  deleteProduct = async (cid, pid) => {
    const deletedCart = await this.manager.deleteProduct(cid, pid);
    return new this.dto(deletedCart);
  };
  deleteCart = async (cid) => {
    const deletedCart = await this.manager.deleteCart(cid);
    return new this.dto(deletedCart);
  };
}

export default CartRepository;
