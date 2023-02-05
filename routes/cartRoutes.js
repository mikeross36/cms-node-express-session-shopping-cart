"use strict"
const express = require("express")
const Cart = require("../controllers/CartController")
const Product = require("../controllers/ProductController")
const cartTemplate = require("../views/carts/cartTemplate")

const router = express.Router();

router.get("/cart", async(req, res) => {
    if (!req.session.cartId) return res.redirect("/")
    
    const cart = await Cart.getOne(req.session.cartId)
    for (let item of cart.items) {
        const product = await Product.getOne(item.id)
        item.product = product;
    }
    res.send(cartTemplate({items: cart.items}))
})

router.post("/cart/add-item", async (req, res) => {
    let cart;
    if (!req.session.cartId) {
        cart = await Cart.createOne({ items: [] });
        req.session.cartId = cart.id;
    }
    else {
        cart = await Cart.getOne(req.session.cartId)
    }
    const itemExists = cart.items.find(item => item.id === req.body.productId)
    
    if (itemExists) {
        itemExists.quantity++;
    }
    else {
        cart.items.push({id: req.body.productId, quantity: 1})
    }
    await Cart.updateOne(cart.id, { items: cart.items })
    
    res.redirect("/cart")
})

router.post("/cart/delete-item", async(req, res) => {
    const { itemId } = req.body;
    const cart = await Cart.getOne(req.session.cartId)
    const remainItems = cart.items.filter(item => item.id !== itemId)

    await Cart.updateOne(req.session.cartId, { items: remainItems })
    res.redirect("/cart")
})

module.exports = router;