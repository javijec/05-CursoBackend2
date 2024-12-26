import CustomRouter from "../../utils/CustomRouter.util.js";
import ProductController from "../../controller/products.controller.js";

const controller = new ProductController();

const { readAllController, readOneController, createOneController, updateOneController, deleteOneController } =
  controller;

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["PUBLIC", "USER", "ADMIN"], readAllController);
    this.read("/:pid", ["USER", "ADMIN"], readOneController);
    this.create("/", ["ADMIN"], createOneController);
    this.update("/:pid", ["ADMIN"], updateOneController);
    this.destroy("/:pid", ["ADMIN"], deleteOneController);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();
