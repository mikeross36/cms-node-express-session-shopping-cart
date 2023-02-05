"use strict"
const layout = require("../layouts/formLayout")
const { getError } = require("../../utils/getError")

module.exports = ({ product, errors }) => {
    return layout({
        content: `
        <div class="container">
            <br/>
            <div class="d-flex justify-content-center">  
                <form method="POST" enctype="multipart/form-data">
                    <h2>Edit product</h2>
                    <br>   
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input value="${product.title}" type="text" class="form-control" name="title">
                        <div id="titleHelp" class="form-text" style="color:red;">${getError(errors, "title")}</div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Price</label>
                        <input value="${product.price}" type="number" class="form-control" name="price">
                        <div id="priceHelp" class="form-text" style="color:red;">${getError(errors, "price")}</div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Image</label>
                        <input type="file" class="form-control" name="image" accept="image/*">
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
        `
    })
}