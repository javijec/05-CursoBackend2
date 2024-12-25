import ProductDTO from "../dto/product.dto.js";
import dao from "../dao/index.factory.js";

const { ProductsManager } = dao;

class ProductRepository {
  constructor() {
    this.manager = new ProductsManager();
    this.dto = ProductDTO;
  }
  ReadAllpaginated = async (limit = 10, page = 1, category, stock, sort) => {
    const products = await this.manager.ReadAllpaginated(limit, page, category, stock, sort);
    return products.map((product) => new this.dto(product));
  };
  readOne = async (pid) => {
    const product = await this.manager.readOne(pid);
    return new this.dto(product);
  };
  createOne = async (product) => {
    const newProduct = await this.manager.createOne(product);
    return new this.dto(newProduct);
  };
  updateOne = async (pid, product) => {
    const updatedProduct = await this.manager.updateOne(pid, product);
    return new this.dto(updatedProduct);
  };
  deleteOne = async (pid) => {
    const deletedProduct = await this.manager.deleteOne(pid);
    return new this.dto(deletedProduct);
  };
  readAll = async () => {
    const products = await this.manager.readAll();
    return products.map((product) => new this.dto(product));
  };
}

export default ProductRepository;
