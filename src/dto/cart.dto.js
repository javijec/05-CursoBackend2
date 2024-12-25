import crypto from "crypto";

const { PERSISTENCE } = process.env;

class CartDTO {
  constructor(cart) {
    PERSISTENCE !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.userId = cart.userId;
    this.products = cart.products;
  }
}

export default CartDTO;
