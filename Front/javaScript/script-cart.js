
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

    itemBtn(plusBtnCart, cart.cartQuantityBtn, "+");
    itemBtn(minusBtnCart, cart.cartQuantityBtn, "-");
    itemBtn(removeBtn, cart.removeItem);
}

// Cycle each button type in Cart Page & apply it's own function
const itemBtn = (button, btnFunction, symbol) => {
    
    button.forEach(btn => {
        btn.addEventListener("click", (event) => {

            btnFunction(event, symbol);
            totalQuantityDOM(cart.updateTotalQty());
            totalPriceDOM(cart.updateTotalPrice());
        });
    });
}


// ======================================================================
// Clear all Cart
// ======================================================================
const cleanCart = () => {
    const cleanBtn = document.querySelector(".clean-cart-btn");
    const listContainer = document.querySelector(".list-container");
    
    cleanBtn.addEventListener("click", () => {
        
        if(listContainer) {

            localStorage.removeItem("cartArray"); // Delete "cartArray" from localStorage
            listContainer.classList.add("translateY_-100");  // Move <div> up
            totalQuantityDOM(cart.updateTotalQty());
            totalPriceDOM(cart.updateTotalPrice());      
           
            setTimeout(() => {
                listContainer.remove();  // Totally remove the html content after delay
            }, 500);
        }
    });
}


// ======================================================================
// Access to form page to confirm order
// ======================================================================
const displayForm = () => {

    const validateBtn = document.querySelector(".validate-btn");
    const validatePageFlow = document.querySelector(".validate-page-flow");
    const validatePage = document.querySelector(".validate-page");
    const cancelPageBtn = document.querySelector(".cancel-order-btn");

    const timeOutDuration = 400; // ==> milliSeconds

    // On Click "Passer Commander" button ==> Show confirm order page (Form)
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

    const purchaseBtn = document.querySelector(".purchase-order-btn");
    const listContainer = document.querySelector(".list-container");
    const loadingSpinner = document.querySelector(".loading-spinner");
    const spinner = document.querySelector(".spinner");
    
    // Spin timer
    const delay = 3000; // ==> milliSeconds
    const spinCount = delay/1000 + 1;

    purchaseBtn.addEventListener("click", (event) => {
       
        cart.purchase(event);
        let cartArray = JSON.parse(localStorage.getItem("cartArray"));

        // If Cart is empty
        if(!cartArray || !cartArray.length) {
            const emptyCartAlert = document.querySelector(".cart-empty-alert"); 
            popAlertMessage(emptyCartAlert);
        }

        // Display loading spinner
        setTimeout(() => {
            let getOrderId = localStorage.getItem("orderId");

            if(getOrderId) {
                
                loadingSpinner.classList.add("visible");
                spinner.classList.add("spinner-anim");
                spinner.style.animationIterationCount = `${spinCount}`;
                
                localStorage.setItem("confirmArray", JSON.stringify(cartArray));
                localStorage.setItem("totalQuantity", cart.updateTotalQty());
                localStorage.setItem("totalPrice", cart.updateTotalPrice());

                localStorage.removeItem("cartArray"); // Delete "cartArray" from localStorage
                listContainer.classList.add("translateY_-100");  // Move <div> up
                totalQuantityDOM(0);
                totalPriceDOM("0 €");
            
                setTimeout(() => {
                    listContainer.remove();  // Totally remove the html content after delay
                }, 500);
            }
        }, 50);
        
        // Redirect to confirm page
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