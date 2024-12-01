import { Router } from "express";
import ProductController from "../../data/mongo/managers/products.controller.js";

const router = Router();
const controllerprod = new ProductController();

router.get("/", async (req, res, next) => {
  try {
    const { limit, page, category, stock, sort } = req.query;
    const products = await controllerprod.getProducts(limit, page, category, stock, sort);
    const { docs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = products;
    res.status(200).render("home", { title: "PRODUCTOS", products: docs, totalPages, page, hasNextPage, hasPrevPage, prevPage, nextPage });
  } catch (error) {
    return next(error);
  }
});

router.get("/realtimeproducts", async (req, res, next) => {
  try {
    const products = await controllerprod.get();
    res.status(200).render("realtimeproducts", { title: "PRODUCTOS", products: products });
  } catch (error) {
    return next(error);
  }
});

export default router;
