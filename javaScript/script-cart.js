
"use strict"

// ======================================================================
//  Create "Items Cart-list elements" html code
// ======================================================================
const creatCartItem = (teddy) => {

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
                    
                    <input class="quantity-input" type="number" name="quantity" min="1" value="${"000"}">
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

    const cart = setCartClass();
    let cartArray = cart.getItems();
    
    for (let i in cartArray) {
        
        let teddy;
        teddy = setTeddy(cartArray[i]);
        creatCartItem(teddy);
    }
}


// Control button "Retirer"
const onClick_Remove = () => {
    const cart = setCartClass();
    cart.removeItem();
}


// Control button "Vider le panier"
const onClick_EmptyCart = () => {
    const cart = setCartClass();
    cart.emptyCart();
}


// Control button "Passer commande"
const onClick_Purchase = () => {
    const cart = setCartClass();
    cart.purchase();
}


// Control button "Confirmer commande"
const onClick_Confirm = () => {
    const cart = setCartClass();
    cart.confirm();
}


// Update Total cart price
const updateTotalPrice = () => {
    const cart = setCartClass();
    cart.setTotalPrice();
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderItemsCartList();
    updateTotalPrice();
    onClick_Remove();
    onClick_EmptyCart();
    onClick_Purchase();
    onClick_Confirm();
});