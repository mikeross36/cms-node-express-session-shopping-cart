"use strict"
const layout = require("../layouts/layout")

module.exports = ({ products }) => {
    const renderedProducts = products.map(product => {
        return `
            <div class="card p-2 h-100" style="width: 18rem; height: 100vh;">
                <img src="data:image/jpg;base64, ${product.image}" class="img-fluid img-thumbnail" alt="...">
                <div class="card-body">
                    <p class="card-title fw-semibold">title: ${product.title}</p>
                    <p class="card-text fw-semibold">price: ${product.price} €</p>
                    <form action="/cart/add-item" method="POST">
                        <input type="hidden" value="${product.id}" name="productId" />
                        <button type="submit" class="btn btn-primary">Add to cart</button>
                    </form>
                </div>
            </div>
        `
    }).join("\n")
    return layout({
        content: `
            <div class="container py-4">
                <div class="col d-flex gap-4 justify-content-center flex-wrap">
                    ${renderedProducts}
                </div>
            </div>
        `
    })
}