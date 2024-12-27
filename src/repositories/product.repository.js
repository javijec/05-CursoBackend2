import ProductDTO from "../dto/product.dto.js";
import dao from "../dao/index.factory.js";

const { ProductsManager } = dao;

class ProductRepository {
  constructor() {
    this.manager = new ProductsManager();
  }

  transformProduct(productData) {
    if (!productData) return null;
    return new ProductDTO(productData);
  }

  transformProducts(products) {
    if (!products || !Array.isArray(products)) return [];
    return products.map((product) => this.transformProduct(product));
  }
  readAllProductspaginatedRepository = async (limit = 10, page = 1, category, stock, sort) => {
    const products = await this.manager.readAllProductspaginated(limit, page, category, stock, sort);
    return products;
  };

  readProductRepository = async (pid) => {
    const product = await this.manager.readProduct(pid);
    return this.transformProduct(product);
  };
  createProductRepository = async (product) => {
    const newProduct = await this.manager.createProduct(product);
    return this.transformProduct(newProduct);
  };
  updateProductRepository = async (pid, product) => {
    const updatedProduct = await this.manager.updateProduct(pid, product);
    return this.transformProduct(updatedProduct);
  };
  deletedProductRepository = async (pid) => {
    const deletedProduct = await this.manager.deletedProduct(pid);
    return this.transformProduct(deletedProduct);
  };
  readAllProductsRepository = async () => {
    const products = await this.manager.readAllProducts();
    return this.transformProducts(products);
  };
}

export default ProductRepository;
