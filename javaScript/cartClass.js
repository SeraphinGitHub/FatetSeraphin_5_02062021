
"use strict"

// ======================================================================
// Class Cart "Items in cart"
// ======================================================================
class CartClass {

    constructor () {
        this.items = JSON.parse(localStorage.getItem("cartArray")) || [];
    }


    getItems() {
        return this.items;
    }

    
    addItem(item, quantityValue) {

        let cartArray = this.getItems();
        
        const setTeddyLocalStorage = () => {
            item.quantity.push(Number (quantityValue));
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
        }
        
        if (!cartArray.includes(item)) {
            cartArray.push(item);
            setTeddyLocalStorage();
            console.log("cart NOT include this Teddy");
        }
        
        else {
            setTeddyLocalStorage();
            console.log("cart include this Teddy");
        }
    }


    removeItem(item) {
        event.target.parentElement.style = removeTransition;  // Move <div> up
        localStorage.setItem(event.target.parentElement.id, 0);  // Set item's data to zero before remove
        updateTotalItems();  // (background.js) Update number of items in the cart
        updateTotalPrice();  // Update total price in the cart
        
        setTimeout(() => {
            localStorage.removeItem(event.target.parentElement.id);  // Remove item's data from localStorage
            event.target.parentElement.remove();  // Totally remove the html content after delay
        }, 400);
    }


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
}


const setCartClass = () => {

    let cart = new CartClass (
        this.items
    );

    return cart
}