import CartDTO from "../dto/cart.dto.js";
import dao from "../dao/index.factory.js";

const { CartManager } = dao;

class CartRepository {
  constructor() {
    this.manager = new CartManager();
  }

  transformCart(cartData) {
    if (!cartData) return null;
    return new CartDTO(cartData);
  }

  transformCarts(carts) {
    if (!carts || !Array.isArray(carts)) return [];
    return carts.map((cart) => this.transformCart(cart));
  }

  createCartRepository = async (user_id) => {
    const newCart = await this.manager.createCart(user_id);
    return this.transformCart(newCart);
  };
  readAllCartRepository = async () => {
    const carts = await this.manager.readAllCart();
    return this.transformCarts(carts);
  };

  readCartRepository = async (cid) => {
    const cart = await this.manager.readCart(cid);
    return this.transformCart(cart);
  };
  updateCartOneProductRepository = async (cid, pid, quantity) => {
    const updatedCart = await this.manager.updateCartOneProduct(cid, pid, quantity);
    return this.transformCart(updatedCart);
  };
  updateCartManyProductsRepository = async (cid, products) => {
    const updatedCart = await this.manager.updateCartManyProducts(cid, products);
    return this.transformCart(updatedCart);
  };

  deleteOneProductRepository = async (cid, pid) => {
    const deletedCart = await this.manager.deleteOneProduct(cid, pid);
    return this.transformCart(deletedCart);
  };
  deleteCartRepository = async (cid) => {
    const deletedCart = await this.manager.deleteCart(cid);
    return this.transformCart(deletedCart);
  };
}

export default CartRepository;
