"use strict"
const MainController = require("./MainController")

class CartController extends MainController { }

module.exports = new CartController("carts.json")