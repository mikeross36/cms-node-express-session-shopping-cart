"use strict"
const layout = require("../layouts/formLayout")

module.exports = ({ items }) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
    }, 0);

    let num = 0;
    const cartItems = items.map(item => {
        return `
            <tr>
                <td data-th="Product">
                    <div class="row align-items-center">
                        <div class="col-md-3 text-left">
                            <img src="data:image/jpg;base64, ${item.product.image}" class="img-fluid img-thumbnail" alt="..." width="150">
                        </div>
                        <div class="col-md-9 text-left mt-sm-2">
                            <p class="font-weight-light">${item.product.title}</p>
                        </div>
                    </div>
                </td>
                <td class="align-middle"" data-th="Price">${item.product.price}€</td>
                <td class="align-middle" data-th="Quantity" class="text-center">${item.quantity}</td>
                <td class="align-middle">
                    <div class="text-right">
                        <form method="POST" action="/cart/delete-item">
                            <input type="hidden" value="${item.id}" name="itemId" />
                            <button type="submit" class="btn btn-danger btn-sm">delete</button>
                        </form>
                    </div>
                </td>
            </tr>
           
        `
    }).join("")

    return layout({
      content: `
            <section class="pt-5 pb-5">
                <div class="container">
                    <div class="row w-100">
                        <div class="col-lg-12 col-md-12 col-12">
                            <h3 class="display-5 mb-4 text-center">Shopping Cart</h3>
                            
                            
                            <table id="shoppingCart" class="table table-condensed table-responsive">
                                <thead>
                                    <tr>
                                        <th style="width:60%">Product</th>
                                        <th style="width:12%">Price</th>
                                        <th style="width:10%">Quantity</th>
                                        <th style="width:16%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${cartItems}
                                </tbody>
                            </table>
                            <div class="d-flex gap-3 align-items-center my-3 bg-body-secondary">
                                <h4><b>Total:</b></h4>
                                <h3>${totalPrice}€</h3>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <a href="/"> Continue Shopping</a>
                        </div>
                        <button class="btn btn-primary btn-sm me-5">
                            <span class="badge text-bg-danger me-1 ">${items.length}</span>items in your cart
                        </button> 
                    </div>
                    <form class="mt-4" action="https://www.paypal.com/us/cgi-bin/webscr" method="post">
                        <input type="hidden" name="cmd" value="_cart">
                        <input type="hidden" name="business" value="vladimir.monarov@gmail.com">
                        <input type="hidden" name="item_name_${num}">
                        <input type="hidden" name="amount_${num}">
                        <input type="hidden" name="quantity_${num}">
                        <input type="hidden" name="currency_code" value="EUR">
                        <input type="hidden" name="amount">
                        <input style="width:8rem;" type="image" src="/images/paypal-icon.svg" name="submit" alt="Make payments with PayPal - it's fast, free and secure!">
                    </form>
                </div>
            </section>
        `,
    });
}