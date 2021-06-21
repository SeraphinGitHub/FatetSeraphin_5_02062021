
"use strict"

// ======================================================================
// Control button " + / - " & "Add to Cart"
// ======================================================================
const onClick_QtyAddCartButton = (teddy) => {
    
    const cart = setCartClass(teddy);
    
    const inputClass = document.querySelector(".quantity-input");
    let quantityValue = Number (inputClass.value);
    const resetValue = 1;
    
    const minusBtn = document.querySelector(".quantity-minus-btn");
    const plusBtn = document.querySelector(".quantity-plus-btn");
    const minValue = Number (inputClass.min);  // Get min value from input field's attribute
    const maxValue = Number (inputClass.max);  // Get max value from input field's attribute
    
    // If product page ==> set the current " + / - " button
    const productPath = "/html/product.html";
    
    if (window.location.pathname === productPath) {
        
        // =======================================
        // On Click " + " Button in Product Page
        // =======================================
        plusBtn.addEventListener("click", () => {
    
            // Keep increase quantity value as long as under max value
            if (quantityValue < maxValue) {
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


        // =======================================
        // On Click " - " Button in Product Page
        // =======================================
        minusBtn.addEventListener("click", () => {

            // Keep decrease quantity value as long as over min value
            if (quantityValue > minValue) {
                quantityValue--;
                inputClass.value = quantityValue;  // Render value in input's field
                plusBtn.style = "background: linear-gradient(to bottom right, greenyellow, rgb(0, 170, 0));"
            }
            
            else return;  // If min value's reached => stop at min value's value
        });
    }



    // =======================================
    // On Click " + / - " Button in Cart Page
    // =======================================
    const cartPath = "/html/cart.html";
   
    // If cart page ==> modify the current " + / - " button
    if (window.location.pathname === cartPath) {
        cart.plusMinusCartPage(quantityValue, minValue, inputClass);
    }
    

    
    // =======================================
    // On Click "Add to Cart" in Product Page
    // =======================================
    const addButton = document.querySelector(".cart-add-btn");

    if (addButton) {

        addButton.addEventListener("click", () => {
    
            cart.addItem(teddy, quantityValue);       
    
            inputClass.value = resetValue;  // After adding item to cart => restore input field to 1
            quantityValue = inputClass.value;  // Restore "+ / -" buttons values to 1
            updateTotalItems();  // (background.js) Update number of items in the cart
            plusBtn.style = "background: linear-gradient(to bottom right, greenyellow, rgb(0, 170, 0));"
        });
    }
}