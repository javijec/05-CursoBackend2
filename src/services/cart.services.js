import CartRepository from "../repositories/cart.repository.js";

class CartService {
  constructor() {
    this.repository = new CartRepository();
  }
  createCartServices = async (user_id) => {
    const newCart = await this.repository.createCartRepository(user_id);
    return newCart;
  };
  readAllCartServices = async () => {
    const carts = await this.repository.readAllCartRepository();
    return carts;
  };

  readCartServices = async (cid) => {
    const cart = await this.repository.readCartRepository(cid);
    return cart;
  };
  updateCartOneProductServices = async (cid, pid, quantity) => {
    const updatedCart = await this.repository.updateCartOneProductRepository(cid, pid, quantity);
    return updatedCart;
  };
  updateCartManyProductsServices = async (cid, products) => {
    const updatedCart = await this.repository.updateCartManyProductsRepository(cid, products);
    return updatedCart;
  };

  deleteOneProductServices = async (cid, pid) => {
    const deletedCart = await this.repository.deleteOneProductRepository(cid, pid);
    return deletedCart;
  };
  deleteCartServices = async (cid) => {
    const deletedCart = await this.repository.deleteCartRepository(cid);
    return deletedCart;
  };
}

export default CartService;
