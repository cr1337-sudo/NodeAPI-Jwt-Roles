const { Router } = require("express");
const router = Router()
const ctrProducts = require("../controllers/products.controller")
const { verifyToken, isAdmin, isModerator } = require("../middlewares/auth.jwt")

router.post("/", [verifyToken, isModerator, isAdmin], ctrProducts.createProduct)
router.get("/", ctrProducts.getProducts)
router.get("/:productId", ctrProducts.getProductById)
router.put("/:productId", [verifyToken, isAdmin], ctrProducts.updateProductById)
router.delete("/:productId", [verifyToken, isAdmin], ctrProducts.deleteProductById)

module.exports = router
