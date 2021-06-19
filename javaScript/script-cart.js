
"use strict"

// ======================================================================
//  Create "Items Cart-list elements" html code
// ======================================================================
const creatCartItem = (data) => {

    let teddy_cart = new TeddyClass (

        data._id,
        data.name,
        data.price,
        data.imageUrl,
        data.description,
        data.quantity,
        data.selectedColor,
        data.colors
    );

    const ulContainer = document.querySelector(".list-container");
    
    // Create html content of one cart item with API's data
    const itemListHtml = `
        <li class="flexCenter">
            <div class="flexCenter flow-cart-item" id="${data._id}">
                <a href="./product.html?_id=${data._id}">
                    <figure>
                        <img src="${teddy_cart.imageUrl}" alt="ours en peluche faits à la main">
                    </figure>
                </a>

                <div class="flexCenter item-caption">
                    <h3>${teddy_cart.name}</h3>
                    <p>${teddy_cart.description}</p>
                </div>

                <h3 class="item-price">${teddy_cart.priceFormated()}</h3>

                <div class="flexCenter quantity">
                    <button class="flexCenter btn quantity-minus-btn" type="button"> - </button>
                    <button class="flexCenter btn quantity-plus-btn" type="button"> + </button>
                    
                    <input class="quantity-input" type="number" name="quantity" min="1" value="${localStorage.getItem(data._id)}">
                </div>

                <button class="btn remove-btn" type="button">Retirer</button>
            </div>
        </li>`
    ;

    ulContainer.insertAdjacentHTML("beforeend", itemListHtml);
}


// ======================================================================
//  Render "Items Cart-list elements"
// ======================================================================
const renderItemsCartList = () => {

    

    // fetch("http://localhost:3000/api/teddies")
    // .then((response) => response.json())
    // .then((data) => {

    //     const arrayLength = data.length;
        
    //     // Cycle API's list & render only matching ID in localoStorage
    //     for (let i = 0; i < arrayLength; i++) {

    //         const dataItemId = data[i]._id;
    //         let itemQuantity = localStorage.getItem(dataItemId);
            
    //         // If exist data in localStorage => Render these data
    //         if(itemQuantity !== null) {
    //             creatCartItem(data[i]);  // Render cart item's html content with API's data
    //             onClick_Remove();  // Call "remove" function to enable deleting item

    //             // ***********************************************
    //             onClick_QtyAddCartButton(dataItemId);  // Call the function to change quantity only
    //             // ***********************************************
    //         }
    //     }

    //     updateTotalPrice();  // Update total price in the cart
    // });
}


// ======================================================================
// Control button "Retirer"
// ======================================================================
const onClick_Remove = () => {

    const removeBtn = document.getElementsByClassName("remove-btn");

    if (removeBtn) {

        const removeTransition = "transform: translateY(-100%); transition-duration: 0.3s";
        
        // Cycle event for each "remove button" of the page
        for (let i = 0; i < removeBtn.length; i++) {
            const button = removeBtn[i];
            
            button.addEventListener("click", (event) => {
                event.target.parentElement.style = removeTransition;  // Move <div> up
                localStorage.setItem(event.target.parentElement.id, 0);  // Set item's data to zero before remove
                updateTotalItems();  // (background.js) Update number of items in the cart
                updateTotalPrice();  // Update total price in the cart
                
                setTimeout(() => {
                    localStorage.removeItem(event.target.parentElement.id);  // Remove item's data from localStorage
                    event.target.parentElement.remove();  // Totally remove the html content after delay
                }, 400);
            }); 
        }
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
    
    let cartArray = JSON.parse(localStorage.getItem("cartArray"));
    
    const calcTotalPrice = () => {
        
        let totalPrice = 0;

        for (let i in cartArray) {
            
            let teddy;
            
            teddy = cartArray[i];
            let qtyArray = teddy.quantity;
            let totalQty = 0;
        
            for (let i in qtyArray) {
                totalQty += qtyArray[i];
            }

            totalPrice += teddy.price * totalQty;
        }

        return totalPrice;
    }
    
    // Turn the total price value into a currency (Cart Page)
    const currencyTotalPrice = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(calcTotalPrice()/100);

    // Display total price in "Total" html container (Cart Page)
    const totalPriceHtml = document.querySelector(".total-price");
    totalPriceHtml.textContent = currencyTotalPrice;
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderItemsCartList();
    onClick_EmptyCart();
    onClick_Purchase();
});