import { Router } from "express";
import ProductController from "../../data/mongo/managers/products.controller.js";

const productsApiRouter = Router();
const controller = new ProductController();

//get all products
productsApiRouter.get("/", async (req, res) => {
  try {
    const { limit, page, category, stock, sort } = req.query;
    console.log(stock);
    const products = await controller.getProducts(limit, page, category, stock, sort);
    res.status(200).send({ status: "success", data: products });
  } catch (error) {
    return next(error);
  }
});

//get product by id
productsApiRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await controller.getProduct(pid);
    if (product) {
      res.status(200).send({ status: "success", data: product });
    } else {
      const message = "PRODUCT NOT FOUND";
      throw new Error(message);
    }
  } catch (error) {
    return next(error);
  }
});

//create product
productsApiRouter.post("/", async (req, res) => {
  try {
    const product = await controller.addProduct(req.body);
    res.status(200).send({ status: "success", message: "Product added successfully", data: product });
  } catch (error) {
    return next(error);
  }
});

//update product
productsApiRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await controller.updateProduct(pid, req.body);
    if (product) {
      res.status(200).send({ status: "success", data: product });
    } else {
      const message = "PRODUCT NOT FOUND";
      throw new Error(message);
    }
  } catch (error) {
    return next(error);
  }
});

//delete product
productsApiRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await controller.deleteProduct(pid);
    if (product) {
      res.status(200).send({ status: "success", message: "Product deleted successfully", data: product });
    } else {
      const message = "PRODUCT NOT FOUND";
      throw new Error(message);
    }
  } catch (error) {
    return next(error);
  }
});

export default productsApiRouter;
