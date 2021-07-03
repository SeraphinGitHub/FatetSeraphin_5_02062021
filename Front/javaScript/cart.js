
"use strict"

// ======================================================================
//  Create "Items Cart-list elements" html code
// ======================================================================
const creatCartItem = (teddy, teddyColor, teddyQty) => {

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

                <div class="flexCenter price-color">
                    <h3 class="item-price">${teddy.priceFormated()}</h3>
                    <span class="flexCenter selected-color">${teddyColor}</span>
                </div>

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

    itemBtn(plusBtnCart, cart.cartQuantityBtn, "+"); // Add 1 quantity to the clicked item "+" button
    itemBtn(minusBtnCart, cart.cartQuantityBtn, "-"); // Remove 1 quantity from the clicked item "-" button
    itemBtn(removeBtn, cart.removeItem); // Remove item from cart when clicked "Remove" button
}

// Cycle each button type in Cart Page & apply it's own function
const itemBtn = (button, btnFunction, symbol) => {
    
    button.forEach(btn => {
        btn.addEventListener("click", (event) => {

            btnFunction(event, symbol);
            totalQuantityDOM(cart.updateTotalQty()); // Update cart qty
            totalPriceDOM(cart.updateTotalPrice()); // Update cart price
        });
    });
}


// ======================================================================
// Clear all Cart
// ======================================================================
const cleanCart = () => {
    const cleanBtn = document.querySelector(".clean-cart-btn");
    const listContainer = document.querySelector(".list-container");
    
    // On click "Clean cart" button
    cleanBtn.addEventListener("click", () => {
        
        // If cart list container exist
        if(listContainer) {

            localStorage.removeItem("cartArray"); // Delete "cartArray" from localStorage
            listContainer.classList.add("translateY_-100");  // Move cart list content up
            totalQuantityDOM(cart.updateTotalQty()); // Update cart qty
            totalPriceDOM(cart.updateTotalPrice()); // Update cart price     
           
            // Totally remove the html content after delay
            setTimeout(() => listContainer.remove(), 500);
        }
    });
}


// ======================================================================
// Access to form page to confirm order
// ======================================================================
const displayForm = () => {

    // Get form content & containers
    const validateBtn = document.querySelector(".validate-btn");
    const validatePageFlow = document.querySelector(".validate-page-flow");
    const validatePage = document.querySelector(".validate-page");
    const cancelPageBtn = document.querySelector(".cancel-order-btn");

    const timeOutDuration = 400; // ==> milliSeconds

    // On Click "Validate order" button ==> Display form page
    validateBtn.addEventListener("click", () => {

        validatePageFlow.classList.add("visible");
        validatePage.classList.add("translateY_0");
        setTimeout(() => validatePage.classList.add("border-radius_0"), timeOutDuration);
    });

    // On Click "Annuler" button ==> Hide confirm order page
    cancelPageBtn.addEventListener("click", () => {
        
        validatePage.classList.remove("border-radius_0");
        
        setTimeout(() => {
            validatePage.classList.remove("translateY_0");
            validatePageFlow.classList.remove("visible")
        }, timeOutDuration);
    });
}


// ======================================================================
// Confirm form page and order command
// ======================================================================
const purchase = () => {

    // Get purchase button, cart list container & loading spinner
    const purchaseBtn = document.querySelector(".purchase-order-btn");
    const listContainer = document.querySelector(".list-container");
    const loadingSpinner = document.querySelector(".loading-spinner");
    const spinner = document.querySelector(".spinner");
    
    // Spin timer
    const delay = 3000; // ==> milliSeconds
    const spinCount = delay/1000 + 1;

    // On click "purchase" button
    purchaseBtn.addEventListener("click", (event) => {
       
        cart.purchase(event); // Send request to the API with cart items & form infos
        let cartArray = JSON.parse(localStorage.getItem("cartArray")); // Get "cartArray" from LS

        // If Cart is empty
        if(!cartArray || !cartArray.length) {
            const emptyCartAlert = document.querySelector(".cart-empty-alert"); 
            popAlertMessage(emptyCartAlert); // Display "empty cart" alert
        }

        // Display loading spinner
        setTimeout(() => {
            let getOrderId = localStorage.getItem("orderId");

            // If received order Id from API's request
            if(getOrderId) {
                
                // Display loading spinner
                loadingSpinner.classList.add("visible");
                spinner.classList.add("spinner-anim");
                spinner.style.animationIterationCount = `${spinCount}`;
                
                // Set cart items, quantity & price to new key in LS
                localStorage.setItem("confirmArray", JSON.stringify(cartArray));
                localStorage.setItem("totalQuantity", cart.updateTotalQty());
                localStorage.setItem("totalPrice", cart.updateTotalPrice());

                // Delete "cartArray" from localStorage
                localStorage.removeItem("cartArray"); 
                listContainer.classList.add("translateY_-100");
                totalQuantityDOM(0); // Set quantity DOM to zero
                totalPriceDOM("0 €"); // Set price DOM to zero
                
                // Totally remove the html content after delay
                setTimeout(() => listContainer.remove(), 500);
            }
        }, 50);
        
        // Redirect to confirm page if received order Id from API's request
        setTimeout(() => {
            let getOrderId = localStorage.getItem("orderId");
            if(getOrderId) document.location.href = "./confirmation.html";
        }, delay);
    });
}


// ======================================================================
// DOM Update Total Price
// ======================================================================
const totalPriceDOM = (price) => {
    
    // Display total price in "Total" html container (Cart Page)
    const totalPriceDiv = document.querySelector(".total-price");
    totalPriceDiv.textContent = price;
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    cleanOldOrder();
    cart.renderItems(creatCartItem);
    totalPriceDOM(cart.updateTotalPrice());
    cartItem_Btns();
    cleanCart();
    displayForm();
    purchase();
});