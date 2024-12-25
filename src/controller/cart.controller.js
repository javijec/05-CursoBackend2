import CartController from "../data/mongo/managers/carts.manager.js";

const controller = new CartController();

async function createCart(req, res, next) {
  console.log(req.user._id);
  const cart = await controller.addCart(req.user._id);
  const response = cart;
  const message = "Cart created successfully";
  return res.json200(response, message);
}

async function getCarts(req, res, next) {
  const carts = await controller.getCarts();
  const response = carts;
  const message = "Carts retrieved successfully";
  return res.json200(response, message);
}

async function getCart(req, res, next) {
  const cart = await controller.getCart(req.params.cid);
  const response = cart;
  const message = "Cart retrieved successfully";
  return res.json200(response, message);
}

async function addProductToCart(req, res, next) {
  const { cid } = req.params;
  const { quantity } = req.body;
  const productData = { product: req.params.pid, quantity: quantity || 1 };
  const updatedCart = await controller.addProduct(cid, productData);
  const response = updatedCart;
  const message = "Product added to cart successfully";
  return res.json200(response, message);
}

async function deleteProductFromCart(req, res, next) {
  const { cid, pid } = req.params;
  const updatedCart = await controller.deleteProduct(cid, pid);
  const response = updatedCart;
  const message = "Product removed from cart successfully";
  return res.json200(response, message);
}

async function updateCart(req, res, next) {
  const { cid } = req.params;
  const { products } = req.body;
  const updatedCart = await controller.updateCartWithProducts(cid, products);
  const response = updatedCart;
  const message = "Cart updated successfully";
  return res.json200(response, message);
}

async function updateProductQuantity(req, res, next) {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const updatedCart = await controller.updateProduct(cid, pid, quantity);
  const response = updatedCart;
  const message = "Product quantity updated successfully";
  return res.json200(response, message);
}

async function deleteCart(req, res, next) {
  const { cid } = req.params;
  const deletedCart = await controller.deleteCart(cid);
  const response = deletedCart;
  const message = "Cart deleted successfully";
  return res.json200(response, message);
}

export { createCart, getCarts, getCart, addProductToCart, deleteProductFromCart, updateCart, updateProductQuantity, deleteCart };
