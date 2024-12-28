class ProductDTO {
  constructor(product) {
    if (!product) {
      throw new Error("Product data is required");
    }
    this.id = product._id?.toString() || product.id; // Handle both Mongo ObjectId and regular id
    this.title = product.title;
    this.description = product.description;
    this.code = product.code;
    this.price = product.price;
    this.status = product.status;
    this.stock = product.stock;
    this.category = product.category;
    this.thumbnails = product.thumbnails;
  }
}

export default ProductDTO;
