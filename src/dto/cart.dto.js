import crypto from "crypto";

const { PERSISTENCE } = process.env;

class CartDTO {
  constructor(cart) {
    if (!cart) {
      throw new Error("Cart data is required");
    }
    PERSISTENCE !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = cart.user_id; // Cambiado de userId a user_id
    this.products = cart.products.map((product) => ({
      product: product.product,
      quantity: product.quantity,
    }));
    this.state = cart.state || "reserved"; // Añadido para incluir el estado
  }
}

export default CartDTO;
