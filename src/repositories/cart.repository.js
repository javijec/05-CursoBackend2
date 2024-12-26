import CartDTO from "../dto/cart.dto.js";
import dao from "../dao/index.factory.js";

const { CartManager } = dao;

class CartRepository {
  constructor() {
    this.manager = new CartManager();
    this.dto = CartDTO;
  }
  createCartRepository = async (user_id) => {
    const newCart = await this.manager.createCart(user_id);
    return new this.dto(newCart);
  };
  readAllCartRepository = async () => {
    const carts = await this.manager.readAllCart();
    return carts.map((cart) => new this.dto(cart));
  };

  readCartRepository = async (cid) => {
    const cart = await this.manager.readCart(cid);
    return new this.dto(cart);
  };
  updateCartOneProductRepository = async (cid, pid, quantity) => {
    const updatedCart = await this.manager.updateCartOneProduct(cid, pid, quantity);
    return new this.dto(updatedCart);
  };
  updateCartManyProductsRepository = async (cid, products) => {
    const updatedCart = await this.manager.updateCartManyProducts(cid, products);
    return new this.dto(updatedCart);
  };
  addOneProductRepository = async (cid, { product, quantity = 1 }) => {
    const addedCart = await this.manager.addOneProduct(cid, { product, quantity });
    return new this.dto(addedCart);
  };
  deleteOneProductRepository = async (cid, pid) => {
    const deletedCart = await this.manager.deleteOneProduct(cid, pid);
    return new this.dto(deletedCart);
  };
  deleteCartRepository = async (cid) => {
    const deletedCart = await this.manager.deleteCart(cid);
    return new this.dto(deletedCart);
  };
}

export default CartRepository;
