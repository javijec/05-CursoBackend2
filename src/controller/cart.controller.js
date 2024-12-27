import CartService from "../services/cart.services.js";
import { verifyTokenUtil } from "../utils/token.util.js";

class CartController {
  constructor() {
    this.service = new CartService();
  }
  createCartController = async (req, res) => {
    const token = req?.cookies?.token;
    const data = verifyTokenUtil(token);
    const { user_id } = data;
    const newCart = await this.service.createCartServices(user_id);
    const response = newCart;
    const message = "Cart created successfully";
    return res.json200(response, message);
  };

  readAllCartController = async (req, res) => {
    const carts = await this.service.readAllCartServices();
    const response = carts;
    const message = "Carts retrieved successfully";
    return res.json200(response, message);
  };

  readCartController = async (req, res) => {
    const { cid } = req.params;
    const cart = await this.service.readCartServices(cid);
    const response = cart;
    const message = "Cart retrieved successfully";
    return res.json200(response, message);
  };

  updateCartOneProductController = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await this.service.updateCartOneProductServices(cid, pid, quantity);
    const response = updatedCart;
    const message = "Product quantity updated successfully";
    return res.json200(response, message);
  };

  updateCartManyProductsController = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const updatedCart = await this.service.updateCartManyProductsServices(cid, products);
    const response = updatedCart;
    const message = "Cart updated successfully";
    return res.json200(response, message);
  };

  deleteOneProductController = async (req, res) => {
    const { cid, pid } = req.params;
    const deletedCart = await this.service.deleteOneProductServices(cid, pid);
    const response = deletedCart;
    const message = "Product removed from cart successfully";
    return res.json200(response, message);
  };

  deleteCartController = async (req, res) => {
    const { cid } = req.params;
    const deletedCart = await this.service.deleteCartServices(cid);
    const response = deletedCart;
    const message = "Cart deleted successfully";
    return res.json200(response, message);
  };
}

export default CartController;
