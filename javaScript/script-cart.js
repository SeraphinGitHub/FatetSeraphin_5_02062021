
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
                    
                    <input class="quantity-input" type="number" name="quantity" min="1" value="${localStorage.getItem(teddy._id)}">
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

        const teddy = setTeddy(cartArray[i]);
        creatCartItem(teddy);
    }
}


// ======================================================================
// Control button "Retirer"
// ======================================================================
const onClick_Remove = () => {

    const removeBtn = document.getElementsByClassName("remove-btn");
    const removeTransition = "transform: translateY(-100%); transition-duration: 0.3s";
    
    // Cycle event for each "remove button" of the page
    for (let i = 0; i < removeBtn.length; i++) {
        const button = removeBtn[i];
        
        button.addEventListener("click", (event) => {
            event.target.parentElement.style = removeTransition;  // Move <div> up

            // localStorage.setItem(event.target.parentElement.id, 0);  // Set item's data to zero before remove
            // updateTotalItems();  // (background.js) Update number of items in the cart
            // updateTotalPrice();  // Update total price in the cart
            
            // setTimeout(() => {
            //     localStorage.removeItem(event.target.parentElement.id);  // Remove item's data from localStorage
            //     event.target.parentElement.remove();  // Totally remove the html content after delay
            // }, 400);
        }); 
    }
}


// ======================================================================
// Control button "Vider le panier"
// ======================================================================
const onClick_EmptyCart = () => {

    const cleanBtn = document.querySelector(".clean-cart-btn");

    if (cleanBtn) {

        const listContainer = document.querySelector(".list-container");
        const emptyTransition = "transform: translateY(-100%); transition-duration: 0.5s";

        cleanBtn.addEventListener("click", () => {

            if (listContainer) {

                listContainer.style = emptyTransition;  // Move <div> up
                localStorage.clear();  // Delete all data from localStorage
                updateTotalItems();  // (background.js) Update number of items in the cart
                updateTotalPrice();  // Update total price in the cart
                
                setTimeout(() => {
                    listContainer.remove();  // Totally remove the html content after delay
                }, 500);
            };
        });
    }
}


// ======================================================================
// Control button "Passer commande"
// ======================================================================
const onClick_Purchase = () => {
    
    const purchaseBtn = document.querySelector(".purchase-btn");

    if (purchaseBtn) {

        purchaseBtn.addEventListener("click", () => {
            
            // ************************************************************
            // POST Function
            // ************************************************************
        });
    }
}


// ======================================================================
// Update Total cart price
// ======================================================================
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
    onClick_EmptyCart();
    onClick_Purchase();
});