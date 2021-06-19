
"use strict"

// ======================================================================
// Control button "+ / -" & "Add to Cart"
// ======================================================================
const onClick_QtyAddCartButton = (teddy) => {
    
    // Set the "+ / -" buttons per item's ID (only need for cart page)
    const inputClass = document.querySelector(".quantity-input");
    let quantityValue = Number (inputClass.value);
    const resetValue = 1;

    plusMinusAddBtn(inputClass, quantityValue, resetValue, teddy);
}


// ======================================================================
// Set button "+ / -" Function
// ======================================================================
const plusMinusAddBtn = (inputClass, quantityValue, resetValue, teddy) => {
    
    
    // ========== On Click "+" Button in Product Page ==========
    const cartPath = "/html/cart.html";
    const plusBtn = document.querySelector(".quantity-plus-btn");
    const maxValue = Number (inputClass.max);  // Get max value from input field's attribute

    plusBtn.addEventListener("click", () => {
        
        // If cart page window ==> modify the current "+" button
        if (window.location.pathname === cartPath) {
            quantityValue++;
            plusMinusCartPage();
        }

        // Keep increase quantity value as long as under max value
        else if (quantityValue < maxValue) {
            quantityValue++;
            inputClass.value = quantityValue;  // Render value in input's field

            if (quantityValue === maxValue) {
                plusBtn.style = "background : linear-gradient(to bottom right, lightgray, black)"
            }
        } 
        
        else {
            alert(`Vous ne pouvez pas ajouter plus de ${maxValue} de cet article au panier en une seule fois !`);
            return;  // If max value's reached => stop at max value's value
        }
    });



    // ========== On Click "-" Button in Product Page  ==========
    const minusBtn = document.querySelector(".quantity-minus-btn");
    const minValue = Number (inputClass.min);  // Get min value from input field's attribute

    minusBtn.addEventListener("click", () => {

        // If cart page window ==> modify the current "-" button
        if (window.location.pathname === cartPath && quantityValue > minValue) {
            quantityValue--;
            plusMinusCartPage();
        }

        // Keep decrease quantity value as long as over min value
        else if (quantityValue > minValue) {
            quantityValue--;
            inputClass.value = quantityValue;  // Render value in input's field
            plusBtn.style = "background: linear-gradient(to bottom right, greenyellow, rgb(0, 170, 0));"
        }
        
        else return;  // If min value's reached => stop at min value's value
    });


    
    // ========== On Click "Add to Cart" in Product Page ==========
    const addButton = document.querySelector(".cart-add-btn");
    let cartArray = [];

    if (localStorage.length) {
        cartArray = JSON.parse(localStorage.getItem("cartArray"));
    }
    
    addButton.addEventListener("click", () => {
        // cartArray.push(Date());
        
        const setTeddyLocalStorage = () => {
            teddy.quantity.push(Number (quantityValue));
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
        }
        
        if (!cartArray.includes(teddy)) {
            cartArray.push(teddy);
            setTeddyLocalStorage();
        }
        
        else {
            setTeddyLocalStorage();
        }

        inputClass.value = resetValue;  // After adding item to cart => restore input field to 1
        quantityValue = inputClass.value;  // Restore "+ / -" buttons values to 1
        updateTotalItems();  // (background.js) Update number of items in the cart
        plusBtn.style = "background: linear-gradient(to bottom right, greenyellow, rgb(0, 170, 0));"
    });



    // ========== On Click "+ / -" Buttons in Cart Page ==========
    const plusMinusCartPage = () => {

        // inputClass.value = quantityValue;
        teddy.quantity = inputClass.value;
        localStorage.setItem("cartArray", JSON.stringify(cartArray));  // Overwrite current localStorage Qty value
        updateTotalItems();  // (background.js) Update number of items in the cart
        updateTotalPrice();  // (cart.js) Update total price in the cart
    }
}