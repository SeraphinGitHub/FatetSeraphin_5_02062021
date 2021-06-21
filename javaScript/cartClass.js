
"use strict"

// ======================================================================
// Class Cart "Items in cart"
// ======================================================================
class CartClass {

    constructor () {
        this.items = JSON.parse(localStorage.getItem("cartArray")) || [];
    }



    // ======================================================================
    // Get data from localStorage
    // ======================================================================
    getItems() {
        return this.items;
    }



    // ======================================================================
    // Add item to Cart
    // ======================================================================
    addItem(teddy, quantityValue) {

        let cartArray = this.getItems();        
        const elementMatchId = element => element._id === teddy._id;
        
        if (!cartArray.find(elementMatchId)) {
            
            teddy.quantity.push(Number (quantityValue));
            cartArray.push(teddy);            
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
        }
        
        else {
            const teddyIndex = cartArray.findIndex(elementMatchId);
            cartArray[teddyIndex].quantity.push(Number (quantityValue));
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
        }
    }


    plusMinusCartPage(quantityValue, minValue, inputClass) {

        let cartArray = this.getItems();        
        
        const minusBtnCart = document.getElementsByClassName("quantity-minus-btn");
        const plusBtnCart = document.getElementsByClassName("quantity-plus-btn");
            
        // modify the current " + " button
        for (let i = 0; i < plusBtnCart.length; i++) {
            const button = plusBtnCart[i];
            
            button.addEventListener("click", (event) => {
                quantityValue++;
                onClickBtn(event);
            });
        }
    

        // modify the current " - " button
        if (quantityValue > minValue) {
        
            for (let i = 0; i < minusBtnCart.length; i++) {
                const button = minusBtnCart[i];
                
                button.addEventListener("click", (event) => {
                    quantityValue--;
                    onClickBtn(event);
                });
            }
        }
        

        const onClickBtn = (event) => {

            inputClass.value = quantityValue;

            const getTargetId = event.target.parentElement.parentElement.id;
            const elementMatchId = element => element._id === getTargetId;
            const teddyIndex = cartArray.findIndex(elementMatchId);

            cartArray[teddyIndex].quantity.push(Number (quantityValue));
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
            
            updateTotalItems();  // (background.js) Update number of items in the cart
            updateTotalPrice();  // (cart.js) Update total price in the cart
        }
    }



    // ======================================================================
    // Remove item from Cart
    // ======================================================================
    removeItem() {

        let cartArray = this.getItems();

        const removeBtn = document.getElementsByClassName("remove-btn");
        const removeTransition = "transform: translateY(-100%); transition-duration: 0.3s";
        
        // Cycle event for each "remove button" of the page
        for (let i = 0; i < removeBtn.length; i++) {
            const button = removeBtn[i];
            
            button.addEventListener("click", (event) => {

                const getTargetId = event.target.parentElement.id;
                const elementMatchId = element => element._id === getTargetId;
                const teddyIndex = cartArray.findIndex(elementMatchId);

                cartArray.splice(teddyIndex, 1);
                localStorage.setItem("cartArray", JSON.stringify(cartArray));

                event.target.parentElement.style = removeTransition;  // Move <div> up                
                updateTotalItems();  // (background.js) Update number of items in the cart
                updateTotalPrice();  // Update total price in the cart

                setTimeout(() => {
                    event.target.parentElement.remove();  // Totally remove the html content after delay
                }, 400);
            }); 
        }
    }



    // ======================================================================
    // Clear all Cart
    // ======================================================================
    emptyCart() {

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
    // Set quantity loop for TotalPrice and TotalQuantity methods
    // ======================================================================
    quantityLoop (total, cartArray, i, priceArg) {
            
        let quantityArray = cartArray[i].quantity;
        total += this.miniQtyLoop(quantityArray) * priceArg;
        
        return total;
    }

    miniQtyLoop(quantityArray) {
        let quantityTotal = 0;

        for (let i in quantityArray) {
            quantityTotal += quantityArray[i];
        }

        return quantityTotal;
    }



    // ======================================================================
    // Calculate item's total quantity
    // ======================================================================
    setTotalQty() {
        
        let cartArray = this.getItems();

        const calcTotalQty = () => {
            
            let totalQtyAll = 0;

            for (let i in cartArray) {

                return this.quantityLoop(totalQtyAll, cartArray, i, 1);
            }

            return totalQtyAll;
        }

        // Display the "total" calculated value in the cart html element
        const cartItemsDiv = document.querySelector(".cart-items");
        cartItemsDiv.textContent = calcTotalQty();
    }



    // ======================================================================
    // Calculate cart's total price 
    // ======================================================================
    setTotalPrice() {

        let cartArray = this.getItems();
    
        const calcTotalPrice = () => {
            
            let totalPrice = 0;

            for (let i in cartArray) {

                let teddyPrice = cartArray[i].price;
                return this.quantityLoop(totalPrice, cartArray, i, teddyPrice);
            }

            return totalPrice;
        }
        
        // Turn the total price value into a currency (Cart Page)
        const currencyTotalPrice = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(calcTotalPrice()/100);

        // Display total price in "Total" html container (Cart Page)
        const totalPriceDiv = document.querySelector(".total-price");

        if (totalPriceDiv) totalPriceDiv.textContent = currencyTotalPrice;
    }


    
    // ======================================================================
    // Access to form page to confirm order
    // ======================================================================
    purchase() {
        
        const purchaseBtn = document.querySelector(".purchase-btn");
        const purchasePageFlow = document.querySelector(".purchase-page-flow");
        const purchasePage = document.querySelector(".purchase-page");
        const cancelPageBtn = document.querySelector(".cancel-order-btn");

        const duration = 0.5;  // ==> (Seconds)
        const timeOutDuration = duration * 600;

        // On Click "Passer Commander" button ==> Show confirm order page (Form)
        if (purchaseBtn) {

            purchaseBtn.addEventListener("click", () => {
    
                purchasePageFlow.style = `
                    visibility: visible;
                `;
    
                purchasePage.style = `
                    transform: translateY(0%);
                    transition-duration: ${duration}s;
                `;
    
                setTimeout(() => {
    
                    purchasePage.style = `
                        border-radius: 0;
                        transform: translateY(0%);
                        transition-duration: ${duration}s;
                    `;
                }, timeOutDuration);
            });
    
    
            // On Click "Annuler" button ==> Hide confirm order page
            cancelPageBtn.addEventListener("click", () => {
    
                purchasePage.style = `
                    border-radius: 50% 50% 0 0;
                    transform: translateY(0%);
                    transition-duration: ${duration}s;
                `;
    
                setTimeout(() => {
                    
                    purchasePage.style = `
                    transform: translateY(100%);
                    transition-duration: ${duration}s;
                    `;
                    
                    purchasePageFlow.style = `
                        visibility: hidden;
                    `;
                }, timeOutDuration);
            });
        }
    }


    
    // ======================================================================
    // Confirm form page and order command
    // ======================================================================
    confirm() {
        const confirmBtn = document.querySelector(".confirm-order-btn");
        if (confirmBtn) {

            confirmBtn.addEventListener("click", () => {
                
                // ************************************************************
                // POST Function
                // ************************************************************
            });
        }
    }
}


const setCartClass = () => {

    let cart = new CartClass (
        this.items
    );

    return cart
}