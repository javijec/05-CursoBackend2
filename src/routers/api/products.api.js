import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import ProductController from "../../controller/products.controller.js";

const controller = new ProductController();

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = controller;

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["USER", "ADMIN"], getProducts);
    this.read("/:pid", ["USER", "ADMIN"], getProduct);
    this.create("/", ["ADMIN"], createProduct);
    this.update("/:pid", ["ADMIN"], updateProduct);
    this.destroy("/:pid", ["ADMIN"], deleteProduct);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();
