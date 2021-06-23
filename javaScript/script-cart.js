
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
//  Render "Items Cart-list elements"
// ======================================================================
const renderItemsCartList = () => {

    let cartArray = cart.getItems();
    
    // For each teddy in cart
    for (let i in cartArray) {

        let teddy = setTeddy(cartArray[i]); // Get Teddy data from localStorage
        let teddyQty = cart.miniQtyLoop(cartArray[i].quantity); //Get Teddy total quantity

        creatCartItem(teddy, teddyQty); // Render list item in cart
    }
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderItemsCartList();
    updateTotalPrice();
    cartQuantityBtn();
    removeItem();
    emptyCart();
    purchase();
    confirm();
});