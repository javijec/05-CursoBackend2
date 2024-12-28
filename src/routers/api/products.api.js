import CustomRouter from "../../utils/CustomRouter.util.js";
import ProductController from "../../controller/products.controller.js";

const controller = new ProductController();

const {
  readAllController,
  readOneController,
  createOneController,
  updateOneController,
  deleteOneController,
  ReadAllpaginatedController,
} = controller;

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["PUBLIC"], readAllController);
    this.read("/paginated", ["PUBLIC"], ReadAllpaginatedController);
    this.read("/:pid", ["PUBLIC"], readOneController);
    this.create("/", ["ADMIN"], createOneController);
    this.update("/:pid", ["ADMIN"], updateOneController);
    this.destroy("/:pid", ["ADMIN"], deleteOneController);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();
