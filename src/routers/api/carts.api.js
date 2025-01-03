import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CartController from "../../controller/cart.controller.js";

const controller = new CartController();

const {
  createCartController,
  readAllCartController,
  readCartController,
  updateCartOneProductController,
  updateCartManyProductsController,
  deleteOneProductController,
  deleteCartController,
  purchaseCartController,
} = controller;

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER", "ADMIN"], passportCb("online"), createCartController);
    this.read("/", ["ADMIN"], readAllCartController);
    this.read("/:cid", ["USER", "ADMIN"], readCartController);
    this.update("/:cid/product/:pid", ["USER", "ADMIN"], updateCartOneProductController);
    this.update("/:cid", ["USER", "ADMIN"], updateCartManyProductsController);
    this.destroy("/:cid/product/:pid", ["USER", "ADMIN"], deleteOneProductController);
    this.destroy("/:cid", ["USER", "ADMIN"], deleteCartController);
    this.create("/:cid/purchase", ["USER", "ADMIN"], purchaseCartController);
  };
}
const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();
