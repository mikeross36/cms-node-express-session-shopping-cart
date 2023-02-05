"user strict"
const express = require("express")
const multer = require("multer")
const Product = require("../../controllers/ProductController")
const { handleErrors, isUserLoggedIn } = require("../../utils/middlewares")
const {validateTitle, validatePrice} = require("../../utils/validators")
const newProductTemplate = require("../../views/admin/newProduct")
const adminProductsTemplate = require("../../views/admin/adminProducts")
const productEditTemplate = require("../../views/admin/editProduct")

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

router.get("/admin/products", async (req, res) => {
    if (!req.session.userId) return res.redirect("/")
    
    const products = await Product.getAll();
    res.send(adminProductsTemplate({ products: products }))
});

router.get("/admin/products/new-product", isUserLoggedIn, (req, res) => {
    res.send(newProductTemplate({}))
})

router.post("/admin/products/new-product",
    isUserLoggedIn,
    upload.single("image"),
    [validateTitle, validatePrice],
    handleErrors(newProductTemplate),
    async (req, res) => {
        const image = req.file.buffer.toString("base64");
        const { title, price } = req.body;
        await Product.createOne({ image: image, title: title, price: price })
        
        res.redirect("/admin/products")
    }
);

router.get("/admin/products/:id/edit",
    isUserLoggedIn, async (req, res) => {
        const product = await Product.getOne(req.params.id)
        if (!product) return res.send("Product not found!")
        
        res.send(productEditTemplate({ product }))
    }
);

router.post("/admin/products/:id/edit",
    isUserLoggedIn,
    upload.single("image"),
    [validateTitle, validatePrice],
    handleErrors(productEditTemplate, async (req) => {
        const product = await Product.getOne(req.params.id)
        return { product: product }
    }),
    async (req, res) => {
        const change = req.body;
        if (req.file) {
            change.image = req.file.buffer.toString("base64")
        }
        try {
            await Product.updateOne(req.params.id, change)
        }
        catch (err) {
            return res.send("Product not found!")
        }

        res.redirect("/admin/products")
    }
);

router.post("/admin/products/:id/delete", isUserLoggedIn, async (req, res) => {
    await Product.deleteOne(req.params.id)
    res.redirect("/admin/products")
})

module.exports = router;