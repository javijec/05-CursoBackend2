import ProductDTO from "../dto/product.dto.js";
import dao from "../dao/index.factory.js";

const { ProductsManager } = dao;

class ProductRepository {
  constructor() {
    this.manager = new ProductsManager();
    this.dto = ProductDTO;
  }
  readAllProductspaginatedRepository = async (limit = 10, page = 1, category, stock, sort) => {
    const products = await this.manager.readAllProductspaginated(limit, page, category, stock, sort);
    return products.map((product) => new this.dto(product));
  };
  readProductRepository = async (pid) => {
    const product = await this.manager.readProduct(pid);
    return new this.dto(product);
  };
  createProductRepository = async (product) => {
    const newProduct = await this.manager.createProduct(product);
    return new this.dto(newProduct);
  };
  updateProductRepository = async (pid, product) => {
    const updatedProduct = await this.manager.updateProduct(pid, product);
    return new this.dto(updatedProduct);
  };
  deletedProductRepository = async (pid) => {
    const deletedProduct = await this.manager.deletedProduct(pid);
    return new this.dto(deletedProduct);
  };
  readAllProductsRepository = async () => {
    const products = await this.manager.readAllProducts();
    return products.map((product) => new this.dto(product));
  };
}

export default ProductRepository;
