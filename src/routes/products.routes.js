const { Router } = require("express");
const router = Router()
const ctrProducts = require("../controllers/products.controller")

router.post("/", ctrProducts.createProduct)
router.get("/", ctrProducts.getProducts)
router.get("/:productId", ctrProducts.getProductById)
router.put("/:productId", ctrProducts.updateProductById)
router.delete("/:productId", ctrProducts.deleteProductById)

module.exports = router
