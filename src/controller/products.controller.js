import ProductService from "../services/product.services.js";

class ProductController {
  constructor() {
    this.service = new ProductService();
  }
  ReadAllpaginated = async (req, res) => {
    const { limit, page, category, stock, sort } = req.query;
    const products = await this.service.ReadAllpaginated(limit, page, category, stock, sort);
    const response = products;
    const message = "Products retrieved successfully";
    return res.json200(response, message);
  };
  readOne = async (req, res) => {
    const { pid } = req.params;
    const product = await this.service.readOne(pid);
    const response = product;
    const message = "Product retrieved successfully";
    return res.json200(response, message);
  };
  createOne = async (req, res) => {
    const product = await this.service.createOne(req.body);
    const response = product;
    const message = "Product added successfully";
    return res.json200(response, message);
  };
  updateOne = async (req, res) => {
    const { pid } = req.params;
    const product = await this.service.updateOne(pid, req.body);
    const response = product;
    const message = "Product updated successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  deleteOne = async (req, res) => {
    const { pid } = req.params;
    const product = await this.service.deleteOne(pid);
    const response = product;
    const message = "Product deleted successfully";
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  readAll = async (req, res) => {
    const products = await this.service.readAll();
    const response = products;
    const message = "Products retrieved successfully";
    return res.json200(response, message);
  };
}

export default ProductController;
