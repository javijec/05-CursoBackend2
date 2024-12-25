import CustomRouter from "../../utils/CustomRouter.util.js";
import productsApiRouter from "./products.api.js";
import authRouter from "./auth.api.js";
import cartsApiRouter from "./carts.api.js";
import usersApiRouter from "./users.api.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = async () => {
    this.use("/products", ["PUBLIC"], productsApiRouter);
    this.use("/users", ["PUBLIC"], usersApiRouter);
    this.use("/carts", ["PUBLIC"], cartsApiRouter);
    this.use("/auth", ["PUBLIC"], authRouter);
  };
}

let apiRouter = new ApiRouter();
apiRouter = apiRouter.getRouter();

export default apiRouter;
