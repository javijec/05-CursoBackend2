import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CartController from "../../controller/cart.controller.js";

const controller = new CartController();

const { createOne, readAll, readOne, updateOne, updateMany, addOne, deleteProduct, deleteCart } = controller;

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER", "ADMIN"], passportCb("online"), createOne);
    this.read("/", ["ADMIN"], passportCb("admin"), readAll);
    this.read("/:cid", ["USER", "ADMIN"], readOne);
    this.create("/:cid/product/:pid", ["USER", "ADMIN"], updateOne);
    this.destroy("/:cid/product/:pid", ["USER", "ADMIN"], deleteProduct);
    this.update("/:cid", ["USER", "ADMIN"], updateMany);
    this.update("/:cid/products/:pid", ["USER", "ADMIN"], deleteProduct);
    this.destroy("/:cid", ["USER", "ADMIN"], deleteCart);
  };
}
const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();
