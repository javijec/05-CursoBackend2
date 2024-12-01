import { Router } from "express";
import CartController from "../../data/mongo/managers/carts.controller.js";

const router = Router();
const controllercart = new CartController();

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await controllercart.getCart(cid);
  res.status(200).render("carts", { title: "CARRITO", cart });
});

export default router;
