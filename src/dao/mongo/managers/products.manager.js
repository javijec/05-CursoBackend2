import productModel from "./models/product.model.js";

class ProductManager {
  constructor() {}

  readAllProducts = async () => {
    const products = await productModel.find().lean();
    return products.length ? products : {};
  };
  //ReadAllpaginated
  readAllProductspaginated = async (limit = 10, page = 1, category, stock, sort) => {
    let query = {};
    const options = { limit, page, lean: true };
    if (sort) {
      options.sort = { price: sort };
    }
    if (category) {
      query.category = category;
    }
    if (stock) {
      query.stock = { $gte: stock };
    }
    const products = await productModel.paginate(query, options);

    if (!products) {
      throw new Error("Failed to fetch products");
    }

    return products;
  };
  //readOne
  readProduct = async (pid) => {
    const product = await productModel.findById(pid).lean();
    if (!product) {
      throw new Error("Product not found READ");
    }
    return product;
  };
  //createOne
  createProduct = async (product) => {
    if (!product || Object.keys(product).length === 0) {
      throw new Error("Invalid product data");
    }

    const newProduct = await productModel.create(product);
    if (!newProduct) {
      throw new Error("Failed to create product");
    }
    return newProduct;
  };
  //updateOne
  updateProduct = async (pid, product) => {
    if (!product || Object.keys(product).length === 0) {
      throw new Error("Invalid product data");
    }

    const existingProduct = await productModel.findById(pid);
    if (!existingProduct) {
      throw new Error("Product not found UPDATE");
    }

    const updatedProduct = await productModel.findByIdAndUpdate(pid, product, { new: true });

    if (!updatedProduct) {
      throw new Error("Failed to update product");
    }

    return updatedProduct;
  };
  //deleteOne
  deletedProduct = async (pid) => {
    const product = await productModel.findById(pid);
    if (!product) {
      console.log("Product not found");
      throw new Error(`Product with ID ${pid} not found`);
    }

    const deletedProduct = await productModel.findByIdAndDelete(pid);
    if (!deletedProduct) {
      console.log("Error deleting product");
      throw new Error("Error deleting product");
    }
    return deletedProduct; //
  };
  //readAll
}

export default ProductManager;
