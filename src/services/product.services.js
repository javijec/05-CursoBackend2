import ProductRepository from "../repositories/product.repository.js";

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }
  ReadAllpaginated = async (limit = 10, page = 1, category, stock, sort) => {
    const products = await this.repository.ReadAllpaginated(limit, page, category, stock, sort);
    return products;
  };
  readOne = async (pid) => {
    const product = await this.repository.readOne(pid);
    return product;
  };
  createOne = async (product) => {
    const newProduct = await this.repository.createOne(product);
    return newProduct;
  };
  updateOne = async (pid, product) => {
    const updatedProduct = await this.repository.updateOne(pid, product);
    return updatedProduct;
  };
  deleteOne = async (pid) => {
    const deletedProduct = await this.repository.deleteOne(pid);
    return deletedProduct;
  };
  readAll = async () => {
    const products = await this.repository.readAll();
    return products;
  };
}

export default ProductService;
