const express = require("express")
const Product = require("../controllers/ProductController")
const productTemplate = require("../views/products/productTemplate")

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.getAll()
    res.send(productTemplate({products: products}))
})

module.exports = router;