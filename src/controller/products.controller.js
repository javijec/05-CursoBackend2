import { console } from "inspector";
import ProductService from "../services/product.services.js";

class ProductController {
  constructor() {
    this.service = new ProductService();
  }
  ReadAllpaginatedController = async (req, res) => {
    const { limit, page, category, stock, sort } = req.query;
    const products = await this.service.readAllProductspaginatedServices(limit, page, category, stock, sort);
    console.log(products);
    const response = products;
    const message = "Products retrieved successfully";
    return res.json200(response, message);
  };
  readOneController = async (req, res) => {
    const { pid } = req.params;
    const product = await this.service.readProductServices(pid);
    const response = product;
    const message = "Product retrieved successfully";
    return res.json200(response, message);
  };
  createOneController = async (req, res) => {
    const product = await this.service.createProductServices(req.body);
    const response = product;
    const message = "Product added successfully";
    return res.json200(response, message);
  };
  updateOneController = async (req, res) => {
    const { pid } = req.params;
    const product = await this.service.updateProductServices(pid, req.body);
    const response = product;
    const message = "Product updated successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  deleteOneController = async (req, res) => {
    const { pid } = req.params;
    const product = await this.service.deletedProductServices(pid);
    const response = product;
    const message = "Product deleted successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  readAllController = async (req, res) => {
    const products = await this.service.readAllProductsServices();
    const response = products;
    const message = "Products retrieved successfully";
    return res.json200(response, message);
  };
}

export default ProductController;
