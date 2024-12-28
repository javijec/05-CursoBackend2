import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import TicketService from "./ticket.services.js";

class CartService {
  constructor() {
    this.repository = new CartRepository();
    this.productRepository = new ProductRepository();
    this.ticketService = new TicketService();
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

  purchaseCartServices = async (cid, user_id) => {
    const cart = await this.repository.readCartRepository(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const productsToPurchase = [];
    const productsNotPurchased = [];
    for (const item of cart.products) {
      console.log(`Checking product with ID: ${item.product._id}`);
      const product = await this.productRepository.readProductRepository(item.product._id);
      if (!product) {
        productsNotPurchased.push(item.product);
        continue;
      }
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await this.productRepository.updateProductRepository(product.id, product);
        productsToPurchase.push(item);
      } else {
        productsNotPurchased.push(item.product);
      }
    }

    if (productsToPurchase.length > 0) {
      const ticketData = {
        code: `TICKET-${Date.now()}`,
        purchaseDatetime: new Date(),
        amount: productsToPurchase.reduce((total, item) => total + item.quantity * item.product.price, 0),
        purchaser: user_id,
      };
      await this.ticketService.createTicket(ticketData);
    }

    cart.products = cart.products.filter((item) => !productsToPurchase.includes(item));
    await this.repository.updateCartManyProductsRepository(cid, cart.products);

    return {
      productsToPurchase,
      productsNotPurchased,
    };
  };
}

export default CartService;
