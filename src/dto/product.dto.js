import crypto from "crypto";

const { PERSISTENCE } = process.env;

class ProductDTO {
  constructor(product) {
    PERSISTENCE !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
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