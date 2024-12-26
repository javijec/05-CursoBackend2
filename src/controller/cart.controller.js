import CartService from "../services/cart.services.js";

class CartController {
  constructor() {
    this.service = new CartService();
  }
  createCartController = async (req, res) => {
    const { user_id } = req.user._id;
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
    const { cid } = req.params;
    const { pid, quantity } = req.body;
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

  addOneProductController = async (req, res) => {
    const { cid } = req.params;
    const { product, quantity = 1 } = req.body;
    const addedCart = await this.service.addOneProductServices(cid, { product, quantity });
    const response = addedCart;
    const message = "Product added to cart successfully";
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
