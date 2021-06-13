
"use strict"

// ======================================================================
// Control button "+ / -" & "Add to Cart" (Product Page)
// ======================================================================
const onClick_QtyAddCartButton = async () => {

    const inputClass = document.querySelector(".quantity-input");

    if(inputClass) {
        
        // ===== "+" Button =====
        const plusBtn = document.querySelector(".quantity-plus-btn");
        const maxValue = Number (inputClass.max);
        
        let quantityValue = Number (inputClass.value);
        let reset = false;
        const resetValue = 1;
        
        plusBtn.addEventListener("click", () => {
            if (reset) {
                reset = false;
                quantityValue = resetValue;
            }
            
            if (quantityValue < maxValue) {
                quantityValue++;
                inputClass.value = quantityValue;
                return quantityValue;
            } 
            
            else return;
        });
        
        
        // ===== "-" Button =====
        const minusBtn = document.querySelector(".quantity-minus-btn");
        const minValue = Number (inputClass.min);
        
        minusBtn.addEventListener("click", () => {
            if (reset) {
                reset = false;
                quantityValue = resetValue;
            }
            
            if (quantityValue > minValue) {
                quantityValue--;
                inputClass.value = quantityValue;
                return quantityValue;
            }
            
            else return;
        });
        
        
        // ===== "Add to Cart" Button =====
        const addButton = document.querySelector(".cart-add-btn");
        const cartItems = document.querySelector(".cart-items");
        const pageParams = new URLSearchParams(window.location.search);
        const getId = pageParams.get("_id");
        
        if(addButton) {
            
            addButton.addEventListener("click", () => {
                setLocalStorage();
                inputClass.value = resetValue;
                cartItems.textContent = localStorage.getItem(getId);
                return reset = true;
            });
            
            
            let addCount = 0;
            
            const setLocalStorage = () => {
                localStorage.setItem(getId, inputClass.value);
                const data = localStorage.getItem(getId);
                
                addCount += Number (data);
                localStorage.setItem(getId, addCount);
            }
        }
    }
}

onClick_QtyAddCartButton();