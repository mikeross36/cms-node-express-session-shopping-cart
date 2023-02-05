"use strict"
const layout = require("../layouts/formLayout")

module.exports = ({ products }) => {
    const renderedProducts = products.map(product => {
        return `
            <tr>
                <td>${product.title}</td>
                <td>${product.price} €</td>
                <td>
                    <a href="/admin/products/${product.id}/edit" role="button" class="btn btn-primary"/>Edit</a>
                </td>
                <td>
                    <form method="POST" action="/admin/products/${product.id}/delete">
                        <button class="btn btn-danger">Delete</button>
                    </form>
                </td>
            </tr>
        `
    }).join("")

    return layout({
        content: `
        <div class="container px-4 py-5">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderedProducts}
                </tbody>
            </table>
        </div>`
    })
}