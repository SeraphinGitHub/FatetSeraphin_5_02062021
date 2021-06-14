
"use strict"
// console.log("QtyBtn JS is loaded");

// ======================================================================
// Control button "+ / -" & "Add to Cart"       (Product Page)
// ======================================================================
const onClick_QtyAddCartButton = async (itemId) => {

    const item = document.getElementById(itemId);
    
    if(item) {
        
        // Set the "+ / -" buttons per item's ID (only need for cart page)
        const inputClass = item.querySelector(".quantity-input");
        let quantityValue = Number (inputClass.value);
        const resetValue = 1;
        
        plusMinusAddBtn(item, inputClass, quantityValue, resetValue);
    }
}


// ======================================================================
// Set button "+ / -" Function          (Product Page)
// ======================================================================
const plusMinusAddBtn = (item, inputClass, quantityValue, resetValue) => {
    
    // ========== On Click "+" Button ==========
    const plusBtn = item.querySelector(".quantity-plus-btn");
    
    if(plusBtn) {

        const maxValue = Number (inputClass.max);  // Get max value from input field's attribute

        plusBtn.addEventListener("click", () => {

            // Keep increase quantity value as long as under max value
            if (quantityValue < maxValue) {
                quantityValue++;
                inputClass.value = quantityValue;  // Render value in input's field
            } 
            
            else return;  // If max value's reached => stop at max value's value
        });
    }


    // ========== On Click "-" Button ==========
    const minusBtn = item.querySelector(".quantity-minus-btn");
    
    if(minusBtn) {

        const minValue = Number (inputClass.min);  // Get min value from input field's attribute

        minusBtn.addEventListener("click", () => {

            // Keep decrease quantity value as long as over min value
            if (quantityValue > minValue) {
                quantityValue--;
                inputClass.value = quantityValue;  // Render value in input's field
            }
            
            else return;  // If min value's reached => stop at min value's value
        });
    }


    // ========== On Click "Add to Cart" Button ==========
    const addButton = item.querySelector(".cart-add-btn");
    
    if(addButton) {
        
        // Get item's ID tranfered from Query String (only need for product page) 
        const pageParams = new URLSearchParams(window.location.search);
        const getId = pageParams.get("_id");

        addButton.addEventListener("click", () => {
            setLocalStorage(getStorage());  // Set item's ID & quantity value in localStorage
            inputClass.value = resetValue;  // After adding item to cart => restore input field to 1
            quantityValue = inputClass.value;  // Restore "+ / -" buttons values to 1
            updateCartItems();  // Update number of items in the cart
        });
        

        // Get localStorage's quantity values per item's ID
        const getStorage = () => {
            let data = localStorage.getItem(getId);
            return data;
        }


        // Set item's ID & quantity value in localStorage 
        const setLocalStorage = (getStorage) => {
            
            // if locaStorage is empty => set localStorage to input field's value
            if (getStorage === null) localStorage.setItem(getId, inputClass.value);
            
            // if locaStorage is not empty => get the previous value & add it up with the new value
            else {
                let itemQty = localStorage.getItem(getId);  // Get previous quantity value
                let itemQtyNumbered = Number (itemQty);  // Turn it into a number (localStorage store as strings)
                itemQtyNumbered += Number (inputClass.value);  // Add up previous value with input field's value
                localStorage.setItem(getId, itemQtyNumbered);  // Store the new calculated value
            }
        }
    }
}