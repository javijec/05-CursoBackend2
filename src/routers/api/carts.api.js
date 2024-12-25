import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { createCart, getCarts, getCart, addProductToCart, deleteProductFromCart, updateCart, updateProductQuantity, deleteCart } from "../../controller/cart.controller.js";

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER", "ADMIN"], passportCb("online"), createCart);
    this.read("/", ["ADMIN"], passportCb("admin"), getCarts);
    this.read("/:cid", ["USER", "ADMIN"], getCart);
    this.create("/:cid/product/:pid", ["USER", "ADMIN"], addProductToCart);
    this.destroy("/:cid/product/:pid", ["USER", "ADMIN"], deleteProductFromCart);
    this.update("/:cid", ["USER", "ADMIN"], updateCart);
    this.update("/:cid/products/:pid", ["USER", "ADMIN"], updateProductQuantity);
    this.destroy("/:cid", ["USER", "ADMIN"], deleteCart);
  };
}
const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();
