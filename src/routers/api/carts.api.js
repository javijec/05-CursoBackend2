import { Router } from "express";
import CartController from "../../data/mongo/managers/carts.controller.js";

const cartsApiRouter = Router();
const controller = new CartController();

//create cart
cartsApiRouter.post("/", async (req, res, next) => {
  try {
    const cart = await controller.addCart();
    res.status(200).send({ status: "success", message: "Cart created successfully", data: cart });
  } catch (error) {
    return next(error);
  }
});

cartsApiRouter.get("/", async (req, res, next) => {
  try {
    const carts = await controller.getCarts();
    res.status(200).send({ status: "success", data: carts });
  } catch (error) {
    return next(error);
  }
});

//get cart
cartsApiRouter.get("/:cid", async (req, res, next) => {
  try {
    const cart = await controller.getCart(req.params.cid);
    res.status(200).send({ status: "success", data: cart });
  } catch (error) {
    return next(error);
  }
});

//add product to cart
cartsApiRouter.post("/:cid/product/:pid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { quantity } = req.body;

    const productData = { product: req.params.pid, quantity: quantity || 1 };

    const updatedCart = await controller.addProduct(cid, productData);
    res.status(200).send({ status: "success", data: updatedCart });
  } catch (error) {
    return next(error);
  }
});

//delete product from cart
cartsApiRouter.delete("/:cid/product/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await controller.deleteProduct(cid, pid);
    res.status(200).send({ status: "success", message: "Product removed from cart", data: updatedCart });
  } catch (error) {
    return next(error);
  }
});

//update cart
cartsApiRouter.put("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const updatedCart = await controller.updateCartWithProducts(cid, products);
    res.status(200).send({ status: "success", data: updatedCart });
  } catch (error) {
    return next(error);
  }
});

//update product quantity
cartsApiRouter.put("/:cid/products/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await controller.updateProduct(cid, pid, quantity);
    res.status(200).send({ status: "success", data: updatedCart });
  } catch (error) {
    return next(error);
  }
});

//delete cart
cartsApiRouter.delete("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const deletedCart = await controller.deleteCart(cid);
    res.status(200).send({ status: "success", message: "Cart deleted successfully", data: deletedCart });
  } catch (error) {
    return next(error);
  }
});

export default cartsApiRouter;
