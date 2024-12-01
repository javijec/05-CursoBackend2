import mongoose from "mongoose";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

class CartController {
  constructor() {}

  addCart = async (user_id) => {
    try {
      const cart = { user_id, products: [] };
      const newCart = await cartModel.create(cart);
      if (!newCart) {
        throw new Error("Failed to create cart");
      }
      return newCart;
    } catch (error) {
      throw error;
    }
  };

  getCarts = async () => {
    try {
      const carts = await cartModel.find().lean();
      return carts || [];
    } catch (error) {
      throw error;
    }
  };

  getCart = async (cid) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        throw new Error("Invalid cart ID format");
      }

      const cart = await cartModel.findById(cid).lean();

      return cart || {};
    } catch (error) {
      console.log("Error en getCart:", error.message);
      throw error;
    }
  };

  updateProduct = async (cid, pid, quantity) => {
    try {
      if (!quantity || isNaN(quantity) || quantity < 0) {
        throw new Error("Invalid quantity value");
      }
      const product = await productModel.findById(pid).lean();
      if (!product) {
        throw new Error("Product not found");
      }
      const cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const productIndex = cart.products.findIndex((item) => item.product.toString() === pid);
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }

      const updatedCart = await cartModel.findByIdAndUpdate(cid, { $set: { [`products.${productIndex}.quantity`]: quantity } }, { new: true });

      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  updateCartWithProducts = async (cid, products) => {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }

      if (!Array.isArray(products)) {
        throw new Error("Products must be an array");
      }

      for (const item of products) {
        if (!item.product || !item.quantity) {
          throw new Error("Invalid product format. Each item must have product and quantity");
        }

        if (isNaN(item.quantity) || item.quantity < 0) {
          throw new Error("Invalid quantity value");
        }

        const productExists = await productModel.findById(item.product).lean();
        if (!productExists) {
          throw new Error(`Product ${item.product} not found in database`);
        }
      }

      const updatedCart = await cartModel.findByIdAndUpdate(cid, { $set: { products: products } }, { new: true });

      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  addProduct = async (cid, { product, quantity = 1 }) => {
    try {
      const productExists = await productModel.findById(product).lean();
      if (!productExists) {
        throw new Error("Product not found");
      }

      const cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const existingProductIndex = cart.products.findIndex((item) => item.product.equals(product));

      let updatedCart;

      if (existingProductIndex === -1) {
        updatedCart = await cartModel.findByIdAndUpdate(cid, { $push: { products: { product: product, quantity: quantity } } }, { new: true });
      } else {
        updatedCart = await cartModel.findByIdAndUpdate(cid, { $inc: { [`products.${existingProductIndex}.quantity`]: quantity } }, { new: true });
      }

      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  deleteProduct = async (cid, pid) => {
    try {
      const cart = await cartModel.findById(cid).populate("products.product", "_id");
      if (!cart) {
        throw new Error("Cart not found");
      }
      const productIndex = cart.products.findIndex((item) => item.product._id.toString() === pid);

      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }

      return await cartModel.findByIdAndUpdate(cid, { $pull: { products: { product: pid } } }, { new: true });
    } catch (error) {
      throw error;
    }
  };

  deleteCart = async (cid) => {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const deletedCart = await cartModel.findByIdAndDelete(cid);

      if (!deletedCart) {
        throw new Error("Error deleting cart");
      }

      return deletedCart;
    } catch (error) {
      throw error;
    }
  };
}
export default CartController;
