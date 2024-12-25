import CartRepository from "../repositories/cart.repository.js";

class CartService {
  constructor() {
    this.repository = new CartRepository();
  }
  createOne = async (user_id) => {
    const newCart = await this.repository.createOne(user_id);
    return newCart;
  };
  readAll = async () => {
    const carts = await this.repository.readAll();
    return carts;
  };

  readOne = async (cid) => {
    const cart = await this.repository.readOne(cid);
    return cart;
  };
  updateOne = async (cid, pid, quantity) => {
    const updatedCart = await this.repository.updateOne(cid, pid, quantity);
    return updatedCart;
  };
  updateMany = async (cid, products) => {
    const updatedCart = await this.repository.updateMany(cid, products);
    return updatedCart;
  };
  addOne = async (cid, { product, quantity = 1 }) => {
    const addedCart = await this.repository.addOne(cid, { product, quantity });
    return addedCart;
  };
  deleteProduct = async (cid, pid) => {
    const deletedCart = await this.repository.deleteProduct(cid, pid);
    return deletedCart;
  };
  deleteCart = async (cid) => {
    const deletedCart = await this.repository.deleteCart(cid);
    return deletedCart;
  };
}

export default CartService;
