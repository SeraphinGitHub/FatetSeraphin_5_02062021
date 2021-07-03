
"use strict"

// ======================================================================
// Render renderProductPage
// ======================================================================
const renderProductPage = async () => {
    
    // Get item's Id from query string
    const pageParams = new URLSearchParams(window.location.search);
    const getId = pageParams.get("_id");

    // Set Teddy from received Id 
    const teddy = await teddyClass_WithAPI(getId);
    
    // Set Teddy's DOM properties
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

    let customBtnText = customBtn.textContent; // Set default custom button's text
    const teddyColors = teddy.colors;
    
    // For each color per Teddy
    for (let i = 0; i < teddyColors.length; i++) {
        
        let color_Indexed = teddyColors[i];

        // Render one color html content in dropdown
        const dropdownContent = document.querySelector(".dropdown-content");
        const dropdownColorsHtml = `<a class="flexCenter color">${color_Indexed}</a>`;
        dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);

        // "On click" this color
        color[i].addEventListener("click", () => {

            teddy.selectedColor = color_Indexed; // Set Teddy's color with selected color
            customBtn.textContent = color_Indexed; // Set custom button's text with selected color
            customBtn.classList.add("chosen-color"); // Add CSS class to change button's style
            closeDropDown(customBtn, dropCont, dropFlow);
    
            addButton.classList.remove("greyed-out-btn"); // Enable "Add to Cart" button with normal style
            noColorAlert.classList.remove("visible"); // Hide alert message
            noColorAlert.classList.remove("opacity_100");
        });
    }

    
    let dropflowComputed = getComputedStyle(dropFlow);

    // On mouse click "color button"
    customBtn.addEventListener("click", function() {

        // If dropdown isn't already open
        if (dropflowComputed.visibility === "hidden") {
            
            dropFlow.classList.add("visible"); // Show dropflow container
            this.classList.remove("custom-btn-delay"); // Remove transition delay
            this.classList.add("border-radius-bottom_0"); // Remove border radius
            this.parentElement.classList.add("translateY_-50"); // Move dropdown container up
            dropCont.classList.add("translateY_0"); // Open dropdown content downward
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
    maxValueAlert.children[0].textContent = maxValue; // Set max value number as text in alert message
    addButton.classList.add("greyed-out-btn"); // Disable "Add to cart" button with grey style
    
    // On Click "Add to Cart" Button
    addButton.addEventListener("click", () => {
        
        let isAddBtnGreyedOut = addButton.classList.contains("greyed-out-btn");

        // If "Add to cart" button is enable
        if(!isAddBtnGreyedOut) {
            customBtn.textContent = customBtnText; // Set "Color" button to default text content
            customBtn.classList.remove("chosen-color"); // Remove color style
            addButton.classList.add("greyed-out-btn"); // Disable "Add to cart" button
            plusBtn.classList.remove("greyed-out-btn"); // Enable "+" button with green style
            
            teddyImgAnim(); //Play picture anim
            cart.addItem(teddy, inputClass); // Add item to cartArray

            // Display item quantity in Cart
            totalQuantityDOM(cart.updateTotalQty());

            // If max quantity alert is visible ==> hide it
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
            
            // Disable "+" button with grey style when over max value reached
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
            
            plusBtn.classList.remove("greyed-out-btn"); // Enable "+" button with green style
            maxValueAlert.classList.remove("visible"); // Hide max quantity alert
            maxValueAlert.classList.remove("opacity_100");
        }
        
        else return;  // If min value's reached => stop at min value's value
    });
}


// ======================================================================
// Set item picture Animation ==> For FUN as well !!! ^_^
// ======================================================================
const teddyImgAnim = () => {

    const teddyImg = document.querySelector(".teddy-img"); // Get Teddy's image
    const teddyImgClone = teddyImg.cloneNode(true); // Clone this image
    const teddyDouble = teddyImg.parentElement.appendChild(teddyImgClone);
    const tedyComputed = getComputedStyle(teddyDouble);

    const duration = 1.3; // ==> Seconds
    const delay = duration * 1000;
    
    // If Teddy's picture is cloned ==> add anim CSS class
    if (tedyComputed.position === "absolute") {
        teddyDouble.classList.add("teddy-img-anim");
        teddyDouble.style.transitionDuration = `${duration}s`;
    }

    // Remove cloned image after finished anim
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