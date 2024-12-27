import mongoose from "mongoose";
import cartModel from "./models/cart.model.js";
import productModel from "./models/product.model.js";

class CartsManager {
  constructor() {}
  //createOne
  createCart = async (user_id) => {
    const cart = { user_id, products: [] };
    const newCart = await cartModel.create(cart);
    if (!newCart) {
      throw new Error("Failed to create cart");
    }
    return newCart;
  };
  //readAll
  readAllCart = async () => {
    const carts = await cartModel.find().lean();
    return carts || [];
  };

  //readOne
  readCart = async (cid) => {
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      throw new Error("Invalid cart ID format");
    }
    const cart = await cartModel.findById(cid).lean();
    return cart || {};
  };

  //updateOne
  updateCartOneProduct = async (cid, pid, quantity) => {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const productExists = await productModel.findById(pid).lean();
    if (!productExists) {
      throw new Error(`Product ${pid} not found in database`);
    }

    const productIndex = cart.products.findIndex((item) => item.product._id.toString() === pid);
    if (productIndex === -1) {
      const newProduct = { product: pid, quantity: quantity };
      cart.products.push(newProduct);
    } else {
      cart.products[productIndex].quantity += quantity;
    }

    const updatedCart = await cartModel.findByIdAndUpdate(cid, { $set: { products: cart.products } }, { new: true });

    return updatedCart;
  };
  //updateMany
  updateCartManyProducts = async (cid, products) => {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    if (!Array.isArray(products)) {
      throw new Error("Products must be an array");
    }

    for (const item of products) {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        throw new Error("Invalid product ID format");
      }

      const productExists = await productModel.findById(item.product).lean();
      if (!productExists) {
        throw new Error(`Product ${item.product} not found in database`);
      }

      if (!item.quantity) {
        throw new Error("Each item must have product and quantity");
      }

      if (isNaN(item.quantity) || item.quantity < 0) {
        throw new Error("Invalid quantity value");
      }
    }

    const updatedCart = await cartModel.findByIdAndUpdate(cid, { $set: { products: products } }, { new: true });

    return updatedCart;
  };
  //deleteOne
  deleteOneProduct = async (cid, pid) => {
    const cart = await cartModel.findById(cid).populate("products.product", "_id");
    if (!cart) {
      throw new Error("Cart not found");
    }
    const productIndex = cart.products.findIndex((item) => item.product._id.toString() === pid);

    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }

    return await cartModel.findByIdAndUpdate(cid, { $pull: { products: { product: pid } } }, { new: true });
  };
  //deleteOne
  deleteCart = async (cid) => {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const deletedCart = await cartModel.findByIdAndDelete(cid);

    if (!deletedCart) {
      throw new Error("Error deleting cart");
    }

    return deletedCart;
  };
}
export default CartsManager;
