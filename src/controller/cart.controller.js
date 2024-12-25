import CartService from "../services/cart.services.js";

class CartController {
  constructor() {
    this.service = new CartService();
  }
  createOne = async (req, res) => {
    const { user_id } = req.user._id;
    const newCart = await this.service.createOne(user_id);
    const response = newCart;
    const message = "Cart created successfully";
    return res.json200(response, message);
  };

  readAll = async (req, res) => {
    const carts = await this.service.readAll();
    const response = carts;
    const message = "Carts retrieved successfully";
    return res.json200(response, message);
  };

  readOne = async (req, res) => {
    const { cid } = req.params;
    const cart = await this.service.readOne(cid);
    const response = cart;
    const message = "Cart retrieved successfully";
    return res.json200(response, message);
  };

  updateOne = async (req, res) => {
    const { cid } = req.params;
    const { pid, quantity } = req.body;
    const updatedCart = await this.service.updateOne(cid, pid, quantity);
    const response = updatedCart;
    const message = "Product quantity updated successfully";
    return res.json200(response, message);
  };

  updateMany = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const updatedCart = await this.service.updateMany(cid, products);
    const response = updatedCart;
    const message = "Cart updated successfully";
    return res.json200(response, message);
  };

  addOne = async (req, res) => {
    const { cid } = req.params;
    const { product, quantity = 1 } = req.body;
    const addedCart = await this.service.addOne(cid, { product, quantity });
    const response = addedCart;
    const message = "Product added to cart successfully";
    return res.json200(response, message);
  };

  deleteProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const deletedCart = await this.service.deleteProduct(cid, pid);
    const response = deletedCart;
    const message = "Product removed from cart successfully";
    return res.json200(response, message);
  };

  deleteCart = async (req, res) => {
    const { cid } = req.params;
    const deletedCart = await this.service.deleteCart(cid);
    const response = deletedCart;
    const message = "Cart deleted successfully";
    return res.json200(response, message);
  };
}

export default CartController;
