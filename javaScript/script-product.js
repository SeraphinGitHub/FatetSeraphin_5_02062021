
"use strict"

// ======================================================================
// Render "Item properties"
// ======================================================================
const renderItemProperties = async () => {
    
    const pageParams = new URLSearchParams(window.location.search);
    const getId = pageParams.get("_id");

    // Get ID tranfered from Query String to initialize item content
    const teddy = await teddyClass_WithAPI(getId);
    
    // Initialize item properties
    document.querySelector(".main").id = teddy._id;
    document.querySelector(".left-container figure img").src = teddy.imageUrl;
    document.querySelector(".item-price").textContent = teddy.priceFormated();
    document.querySelector(".item-name").textContent = teddy.name;
    document.querySelector(".item-description").textContent = teddy.description;
        
    // Get Custom button
    const customBtn = document.querySelector(".custom-btn");
    let customBtnText = customBtn.textContent;

    renderCustomBtn(teddy, customBtn); // Render Teddy's colors    
    product_AddQtyBtn(teddy, customBtn, customBtnText); // Manage + / - & Add buttons
}


// ======================================================================
// Render custom button & each Teddy's color in dropdown
// ======================================================================
const renderCustomBtn = (teddy, customBtn) => {

    // Get Custom button & DropDown content
    const dropCont = document.querySelector(".dropdown-content");
    const dropFlow = document.querySelector(".dropdown-flow");
    const color = document.getElementsByClassName("color");

    const teddyColors = teddy.colors;

    // Render html content for each color per Teddy
    for (let i = 0; i < teddyColors.length; i++) {
        
        let color_Indexed = teddyColors[i];
        createDropdownColors(color_Indexed);
        colorBtn(teddy, color, i, color_Indexed, customBtn, dropCont, dropFlow);
    }

    const dropComputed = getComputedStyle(dropFlow);

    // On mouse click "Couleurs" button
    customBtn.addEventListener("click", function() {

        // Open color dropdown
        if (dropComputed.visibility === "hidden") {
            
            dropFlow.classList.add("visible");
            this.classList.remove("custom-btn-delay");
            this.classList.add("border-radius-bottom_0");
            this.parentElement.classList.add("translateY_-50");
            dropCont.classList.add("translateY_0");
        }

        // Close color dropdown
        else {
            closeDropDown(customBtn, dropCont, dropFlow);
        }
    });
}

const createDropdownColors = (color_Indexed) => {

    const dropdownContent = document.querySelector(".dropdown-content");
    const dropdownColorsHtml = `<a class="flexCenter color">${color_Indexed}</a>`;
    dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);
}

const colorBtn = (teddy, color, i, color_Indexed, customBtn, dropCont, dropFlow) => {
    
    color[i].addEventListener("click", () => {

        teddy.selectedColor = color_Indexed;
        customBtn.textContent = color_Indexed;
        customBtn.classList.add("chosen-color");
        closeDropDown(customBtn, dropCont, dropFlow);
    });
}

const closeDropDown = (customBtn, dropCont, dropFlow) => {

    dropFlow.classList.remove("visible");
    customBtn.classList.add("custom-btn-delay");
    customBtn.classList.remove("border-radius-bottom_0");
    customBtn.parentElement.classList.remove("translateY_-50");
    dropCont.classList.remove("translateY_0");
}


// ======================================================================
// Handle "+ / -" & "Add to Cart" buttons in Product Page
// ======================================================================
const product_AddQtyBtn = (teddy, customBtn, customBtnText) => {
    
    const plusBtn = document.querySelector(".quantity-plus-btn"); // Get "+" button Product Page
    const minusBtn = document.querySelector(".quantity-minus-btn"); // Get "-" button Product Page
    const addButton = document.querySelector(".cart-add-btn");
    const inputClass = document.querySelector(".quantity-input"); // Get input field's Product Page
    
    const minValue = Number (inputClass.min);  // Get min value from input field's attribute
    const maxValue = Number (inputClass.max);  // Get max value from input field's attribute

    // **********************************************************
    const maxValueAlert = document.querySelector(".max-value-alert"); // <== For FUN !!! ^_^
    maxValueAlert.children[0].textContent = maxValue;
    // **********************************************************
    
    
    // On Click "Add to Cart"
    addButton.addEventListener("click", () => {

        cart.addItem(teddy, inputClass, plusBtn, maxValueAlert);
        teddyImgAnim();
        customBtn.textContent = customBtnText;
        customBtn.classList.remove("chosen-color");   
    });
    

    // On Click " + " Button
    plusBtn.addEventListener("click", () => {

        cart.plusBtnProduct(maxValue, inputClass, plusBtn, maxValueAlert);
    });  
    

    // On Click " - " Button
    minusBtn.addEventListener("click", () => {

        cart.minusBtnProduct(minValue, inputClass, plusBtn, maxValueAlert);
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
    renderItemProperties();
});