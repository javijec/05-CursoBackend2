import CustomRouter from "../../utils/CustomRouter.util.js";
import ProductController from "../../data/mongo/managers/products.controller.js";

const controller = new ProductController();

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", getProducts);
    this.read("/:pid", getProduct);
    this.create("/", createProduct);
    this.update("/:pid", updateProduct);
    this.destroy("/:pid", deleteProduct);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();

async function getProducts(req, res, next) {
  const { limit, page, category, stock, sort } = req.query;
  const products = await controller.getProducts(limit, page, category, stock, sort);
  const response = products;
  const message = "Products retrieved successfully";
  return res.json200(response, message);
}

async function getProduct(req, res, next) {
  const { pid } = req.params;
  const product = await controller.getProduct(pid);
  if (product) {
    const response = product;
    const message = "Product retrieved successfully";
    return res.json200(response, message);
  } else {
    return res.json404();
  }
}

async function createProduct(req, res, next) {
  const product = await controller.addProduct(req.body);
  const response = product;
  const message = "Product added successfully";
  return res.json200(response, message);
}

async function updateProduct(req, res, next) {
  const { pid } = req.params;
  const product = await controller.updateProduct(pid, req.body);
  if (product) {
    const response = product;
    const message = "Product updated successfully";
    return res.json200(response, message);
  } else {
    return res.json404();
  }
}

async function deleteProduct(req, res, next) {
  const { pid } = req.params;
  const product = await controller.deleteProduct(pid);
  if (product) {
    const response = product;
    const message = "Product deleted successfully";
    return res.json200(response, message);
  } else {
    return res.json404();
  }
}
