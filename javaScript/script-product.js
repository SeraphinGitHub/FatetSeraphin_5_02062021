
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
    
    const colorsLength = teddy.colors.length;
    const teddyColors = teddy.colors;

    // Render html content for each color per Teddy
    for (let i = 0; i < colorsLength; i++) {
        createDropdownColors(teddyColors, i);
    }

    product_BtnHandler(teddy);
    customButton(colorsLength);
}


// ======================================================================
// Create html content of one color with API's jsonData
// ======================================================================
const createDropdownColors = (teddyColors, colorId) => {
            
    const dropdownContent = document.querySelector(".dropdown-content");
    const dropdownColorsHtml = `<a class="flexCenter">${teddyColors[colorId]}</a>`;
    dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);
}


// ======================================================================
// Handle "+ / -" & "Add to Cart" buttons in Product Page
// ======================================================================
const product_BtnHandler = (teddy) => {
    
    const plusBtn = document.querySelector(".quantity-plus-btn"); // Get "+" button Product Page
    const minusBtn = document.querySelector(".quantity-minus-btn"); // Get "-" button Product Page
    const addButton = document.querySelector(".cart-add-btn");
    const inputClass = document.querySelector(".quantity-input"); // Get input field's Product Page
    
    const minValue = Number (inputClass.min);  // Get min value from input field's attribute
    const maxValue = Number (inputClass.max);  // Get max value from input field's attribute

    // **********************************************************
    // For FUN !!! ^_^ (I like coding)
    // **********************************************************
    const maxValueAlert = document.querySelector(".max-value-alert");
    
    maxValueAlert.children[0].textContent = maxValue;
    const transitionTime = 1; // ==> (Seconds)
    // **********************************************************
    

    // On Click "Add to Cart"
    addButton.addEventListener("click", () => {
        cart.addItem(teddy, inputClass, plusBtn);
    });
    

    // On Click " + " Button
    plusBtn.addEventListener("click", () => {
        cart.plusBtnProduct(maxValue, inputClass, plusBtn, maxValueAlert, transitionTime);
    });  
    

    // On Click " - " Button
    minusBtn.addEventListener("click", () => {
        cart.minusBtnProduct(minValue, inputClass, plusBtn, maxValueAlert, transitionTime);
    });
}


// ======================================================================
// Control button "Personaliser"
// ======================================================================
const customButton = (colorsLength) => {

    const customBtn = document.querySelector(".custom-btn");
    const dropCont = document.querySelector(".dropdown-content");
    const dropFlow = document.querySelector(".dropdown-flow");

    const duration = 0.6;  // ==> (Seconds)

    // On mouse click "Personaliser" button
    customBtn.addEventListener("click", function() {

        dropFlow.style = "visibility: visible";
        this.style = "border-radius: 20px 20px 0 0";

        this.parentElement.style = `
            transform: translateY(-${25 * colorsLength}%);
            transition-duration: ${duration}s;
        `;

        dropCont.style = `
            transform: translateY(0%);
            transition-duration: ${duration}s;
        `;
    });


    // On mouse leave dropdown's container
    dropCont.addEventListener("mouseleave", function() {
        
        this.parentElement.parentElement.style = `
            transform: translateY(0%);
            transition-duration: ${duration}s;
        `;

        dropCont.style = `
            transform: translateY(-100%);
            transition-duration: ${duration}s;
        `;
        
        customBtn.style = `
            border-radius: 20px;
            transition-delay: ${duration}s;
            transition-duration: ${duration}s;
        `;

        dropFlow.style = `
            visibility: hidden;
        `;
    });
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderItemProperties();
});