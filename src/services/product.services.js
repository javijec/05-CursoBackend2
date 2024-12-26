import ProductRepository from "../repositories/product.repository.js";

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }
  readAllProductspaginatedServices = async (limit = 10, page = 1, category, stock, sort) => {
    const products = await this.repository.readAllProductspaginatedRepository(limit, page, category, stock, sort);
    return products;
  };
  readProductServices = async (pid) => {
    const product = await this.repository.readProductRepository(pid);
    return product;
  };
  createProductServices = async (product) => {
    const newProduct = await this.repository.createProductRepository(product);
    return newProduct;
  };
  updateProductServices = async (pid, product) => {
    const updatedProduct = await this.repository.updateProductRepository(pid, product);
    return updatedProduct;
  };
  deletedProductServices = async (pid) => {
    const deletedProduct = await this.repository.deletedProductRepository(pid);
    return deletedProduct;
  };
  readAllProductsServices = async () => {
    const products = await this.repository.readAllProductsRepository();
    return products;
  };
}

export default ProductService;
