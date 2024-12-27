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
  addOneProductController,
  deleteOneProductController,
  deleteCartController,
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
    this.create("/:cid/product/:pid", ["USER", "ADMIN"], updateCartOneProductController);
    this.destroy("/:cid/product/:pid", ["USER", "ADMIN"], addOneProductController);
    this.update("/:cid", ["USER", "ADMIN"], updateCartManyProductsController);
    this.update("/:cid/products/:pid", ["USER", "ADMIN"], deleteOneProductController);
    this.destroy("/:cid", ["USER", "ADMIN"], deleteCartController);
  };
}
const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();
