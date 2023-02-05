"use strict"
const MainController = require("./mainController");

class ProductController extends MainController { }

module.exports = new ProductController("products.json")