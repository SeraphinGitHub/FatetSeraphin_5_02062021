
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
    addItem(item, quantityValue) {

        let cartArray = this.getItems();
        
        const setTeddyLocalStorage = () => {
            item.quantity.push(Number (quantityValue));
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
        }

        // If Teddy item !exist in cart shop ==> Add item + chosen Qty
        if (!cartArray.some(arg => arg._id === item._id)) {
            
            cartArray.push(item);
            setTeddyLocalStorage();

            // ********************
            console.log("First");
        }
        
        // If Teddy item already exist in cart shop ==> Just add chosen Qty
        else {
            setTeddyLocalStorage();

            // ********************
            console.log("Just add Qty");
        }      
    }



    // ======================================================================
    // Remove item from Cart
    // ======================================================================
    removeItem() {

        const removeBtn = document.getElementsByClassName("remove-btn");
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
    // Calculate cart's total price 
    // ======================================================================
    setTotalPrice() {

        let cartArray = this.getItems();
    
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
        const totalPriceDiv = document.querySelector(".total-price");
        if (totalPriceDiv) totalPriceDiv.textContent = currencyTotalPrice;
    }



    // ======================================================================
    // Calculate item's total quantity
    // ======================================================================
    setTotalQty() {

        let cartArray = this.getItems();

        const calcTotalQty = () => {
            
            let totalQtyAll = 0;

            for (let i in cartArray) {
                
                let teddy;
                teddy = cartArray[i];
                let qtyArray = teddy.quantity;
                let totalQty = 0;
            
                for (let i in qtyArray) {
                    totalQty += qtyArray[i];
                }

                totalQtyAll += totalQty;
            }

            return totalQtyAll;
        }

        // Display the "total" calculated value in the cart html element
        const cartItemsDiv = document.querySelector(".cart-items");
        if (cartItemsDiv) cartItemsDiv.textContent = calcTotalQty();
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


    
    // ======================================================================
    // Confirm form page and order command
    // ======================================================================
    confirm() {
        const confirmBtn = document.querySelector(".confirm-order-btn");

        confirmBtn.addEventListener("click", () => {
            
            // ************************************************************
            // POST Function
            // ************************************************************
        });
    }
}


const setCartClass = () => {

    let cart = new CartClass (
        this.items
    );

    return cart
}