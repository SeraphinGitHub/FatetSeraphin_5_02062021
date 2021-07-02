
"use strict"

// ======================================================================
// Render renderProductPage
// ======================================================================
const renderProductPage = async () => {
    
    const pageParams = new URLSearchParams(window.location.search);
    const getId = pageParams.get("_id");

    // Get ID tranfered from Query String to initialize item content
    const teddy = await teddyClass_WithAPI(getId);
    
    // Set item properties
    document.querySelector(".main").id = teddy._id;
    document.querySelector(".left-container figure img").src = teddy.imageUrl;
    document.querySelector(".item-price").textContent = teddy.priceFormated();
    document.querySelector(".item-name").textContent = teddy.name;
    document.querySelector(".item-description").textContent = teddy.description;

    // Get Custom button & DropDown content & Add button
    const customBtn = document.querySelector(".custom-btn");
    const dropCont = document.querySelector(".dropdown-content");
    const dropFlow = document.querySelector(".dropdown-flow");
    const addButton = document.querySelector(".cart-add-btn");
    const color = document.getElementsByClassName("color");
    const noColorAlert = document.querySelector(".no-color-alert"); 
    
    // Set default custom button's text
    let customBtnText = customBtn.textContent;
    
    
    const teddyColors = teddy.colors;
    
    // For each color per Teddy
    for (let i = 0; i < teddyColors.length; i++) {
        
        let color_Indexed = teddyColors[i];

        // Render html content 
        const dropdownContent = document.querySelector(".dropdown-content");
        const dropdownColorsHtml = `<a class="flexCenter color">${color_Indexed}</a>`;
        dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);


        // "On click" color
        color[i].addEventListener("click", () => {

            teddy.selectedColor = color_Indexed; // Set Teddy's Class color with selected color
            customBtn.textContent = color_Indexed; // Set custom button's text with selected color
            customBtn.classList.add("chosen-color"); // Add CSS class to change button's style
            closeDropDown(customBtn, dropCont, dropFlow);
    
            addButton.classList.remove("greyed-out-btn"); // Set back "Add to Cart" button to normal style
            noColorAlert.classList.remove("visible"); // Hide alert message
            noColorAlert.classList.remove("opacity_100");
        });
    }

    
    let isDropFlowVisible = dropFlow.classList.contains("visible");

    // On mouse click "Couleurs" button
    customBtn.addEventListener("click", function() {

        // Open color dropdown
        if (!isDropFlowVisible) {
            
            dropFlow.classList.add("visible");
            this.classList.remove("custom-btn-delay");
            this.classList.add("border-radius-bottom_0");
            this.parentElement.classList.add("translateY_-50");
            dropCont.classList.add("translateY_0");
        }

        // Close color dropdown
        else closeDropDown(customBtn, dropCont, dropFlow);
    });
    
    // Manage + / - & Add button
    product_QuantityBtn(teddy, customBtn, addButton, noColorAlert, customBtnText);
}


// ======================================================================
// Close & hide color dropdown
// ======================================================================
const closeDropDown = (customBtn, dropCont, dropFlow) => {

    dropFlow.classList.remove("visible");
    customBtn.classList.add("custom-btn-delay");
    customBtn.classList.remove("border-radius-bottom_0");
    customBtn.parentElement.classList.remove("translateY_-50");
    dropCont.classList.remove("translateY_0");
}


// ======================================================================
// Manage "+ / -" buttons in Product Page
// ======================================================================
const product_QuantityBtn = (teddy, customBtn, addButton, noColorAlert, customBtnText) => {
    
    const plusBtn = document.querySelector(".quantity-plus-btn"); // Get "+" button Product Page
    const minusBtn = document.querySelector(".quantity-minus-btn"); // Get "-" button Product Page
    const inputClass = document.querySelector(".quantity-input"); // Get input field's Product Page
    const minValue = Number (inputClass.min);  // Get min value from input field's attribute
    const maxValue = Number (inputClass.max);  // Get max value from input field's attribute

    const maxValueAlert = document.querySelector(".max-value-alert");
    maxValueAlert.children[0].textContent = maxValue;
    
    addButton.classList.add("greyed-out-btn");

    
    // On Click "Add to Cart" Button
    addButton.addEventListener("click", () => {
        
        let isAddBtnGreyedOut = addButton.classList.contains("greyed-out-btn");

        // If color was selected
        if(!isAddBtnGreyedOut) {

            customBtn.textContent = customBtnText;
            customBtn.classList.remove("chosen-color");
            addButton.classList.add("greyed-out-btn");
            plusBtn.classList.remove("greyed-out-btn");
            
            teddyImgAnim();
            cart.addItem(teddy, inputClass);

            // Display item quantity in Cart
            totalQuantityDOM(cart.updateTotalQty());

            if (getComputedStyle(maxValueAlert).visibility === "visible") {
                maxValueAlert.classList.remove("visible");
                maxValueAlert.classList.remove("opacity_100");
            }
        }

        // If color was not selected
        else popAlertMessage(noColorAlert);
    });


    // On Click " + " Button
    plusBtn.addEventListener("click", () => {

        let quantityValue = Number (inputClass.value);
        
        // Keep increase quantity value as long as under max value
        if (quantityValue < maxValue) {
            
            quantityValue++;
            inputClass.value = quantityValue; // Render value in input's field
            
            // Grey out "+" button over max value reached
            if (quantityValue === maxValue) plusBtn.classList.add("greyed-out-btn");
        } 
        
        else popAlertMessage(maxValueAlert);
    });  
    

    // On Click " - " Button
    minusBtn.addEventListener("click", () => {

        let quantityValue = Number (inputClass.value);
        
        // Keep decrease quantity value as long as over min value
        if (quantityValue > minValue) {

            quantityValue--;
            inputClass.value = quantityValue;  // Render value in input's field
            
            plusBtn.classList.remove("greyed-out-btn");
            maxValueAlert.classList.remove("visible");
            maxValueAlert.classList.remove("opacity_100");
        }
        
        else return;  // If min value's reached => stop at min value's value
    });
}


// ======================================================================
// Set item picture Animation ==> For FUN as well !!! ^_^
// ======================================================================
const teddyImgAnim = () => {

    const teddyImg = document.querySelector(".teddy-img");
    const teddyImgClone = teddyImg.cloneNode(true);
    const teddyDouble = teddyImg.parentElement.appendChild(teddyImgClone);
    const tedyComputed = getComputedStyle(teddyDouble);

    const duration = 1.3; // ==> Seconds
    const delay = duration * 1000;
        
    if (tedyComputed.position === "absolute") {

        teddyDouble.classList.add("teddy-img-anim");
        teddyDouble.style.transitionDuration = `${duration}s`;
    }

    setTimeout(() => {
        teddyDouble.remove();
    }, delay)
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderProductPage();
});