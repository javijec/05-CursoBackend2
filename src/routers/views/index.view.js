import { Router } from "express";
import productsViewRouter from "./products.view.js";
import cartsViewRouter from "./carts.view.js";
//import usersViewRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsViewRouter);
viewsRouter.use("/carts", cartsViewRouter);
//viewsRouter.use("/users", usersApiRouter);

export default viewsRouter;
