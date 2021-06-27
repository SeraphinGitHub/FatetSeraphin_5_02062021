
"use strict"

// ======================================================================
//  Create "Items Cart-list elements" html code
// ======================================================================
const creatCartItem = (teddy, teddyQty) => {

    const ulContainer = document.querySelector(".list-container");

    // Create html content of one cart item with API's data
    const itemListHtml = `
        <li class="flexCenter">
            <div class="flexCenter flow-cart-item" id="${teddy._id}">
                <a href="./product.html?_id=${teddy._id}">
                    <figure>
                        <img src="${teddy.imageUrl}" alt="ours en peluche faits à la main">
                    </figure>
                </a>

                <div class="flexCenter item-caption">
                    <h3>${teddy.name}</h3>
                    <p>${teddy.description}</p>
                </div>

                <h3 class="item-price">${teddy.priceFormated()}</h3>

                <div class="flexCenter quantity">
                    <button class="flexCenter btn quantity-minus-btn" type="button"> - </button>
                    <button class="flexCenter btn quantity-plus-btn" type="button"> + </button>
                    
                    <input class="quantity-input" type="number" name="quantity" min="1" value="${teddyQty}">
                </div>

                <button class="btn remove-btn" type="button">Retirer</button>
            </div>
        </li>`
    ;

    if (ulContainer) ulContainer.insertAdjacentHTML("beforeend", itemListHtml);
}


// ======================================================================
// Control " + / - "  &  "Remove" buttons per item in Cart Page
// ======================================================================
const cartItem_Btns = () => {

    const plusBtnCart = document.querySelectorAll(".quantity-plus-btn");
    const minusBtnCart = document.querySelectorAll(".quantity-minus-btn");
    const removeBtn = document.querySelectorAll(".remove-btn");
  
    itemBtn(plusBtnCart, cart.cartQuantityBtn, "+");
    itemBtn(minusBtnCart, cart.cartQuantityBtn, "-");
    itemBtn(removeBtn, cart.removeItem);
}

// Cycle each button type in Cart Page & apply it's own function
const itemBtn = (button, btnFunction, symbol) => {
    
    button.forEach(btn => {
        
        btn.addEventListener("click", (event) => {
            btnFunction(event, symbol);
        });
    });
}


// ======================================================================
// Clear all Cart
// ======================================================================
const emptyCart = () => {

    const cleanBtn = document.querySelector(".clean-cart-btn");
    const listContainer = document.querySelector(".list-container");

    cleanBtn.addEventListener("click", () => {

        if (listContainer) {
            cart.emptyCart(listContainer);
        };
    });
}


// ======================================================================
// Access to form page to confirm order
// ======================================================================
const purchase = () => {

    const purchaseBtn = document.querySelector(".purchase-btn");
    const purchasePageFlow = document.querySelector(".purchase-page-flow");
    const purchasePage = document.querySelector(".purchase-page");
    const cancelPageBtn = document.querySelector(".cancel-order-btn");

    const timeOutDuration = 300; // ==> milliSeconds

    // On Click "Passer Commander" button ==> Show confirm order page (Form)
    purchaseBtn.addEventListener("click", () => {
        cart.purchase(purchasePageFlow, purchasePage, timeOutDuration);
    });

    // On Click "Annuler" button ==> Hide confirm order page
    cancelPageBtn.addEventListener("click", () => {
        cart.cancelPurchase(purchasePageFlow, purchasePage, timeOutDuration);
    });
}


// ======================================================================
// Confirm form page and order command
// ======================================================================
const confirm = () => {
    const confirmBtn = document.querySelector(".confirm-order-btn");

    confirmBtn.addEventListener("click", (event) => {
        cart.confirm(event);
    });
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    cart.renderItems(creatCartItem);
    cart.updateTotalPrice();
    cartItem_Btns();
    emptyCart();
    purchase();
    confirm();
});