
"use strict"

// ======================================================================
// Render "Item properties"
// ======================================================================
const renderItemProperties = () => {
    
    const pageParams = new URLSearchParams(window.location.search);
    const getId = pageParams.get("_id");

    // Get ID tranfered from Query String to initialize item content 
    fetch(`http://localhost:3000/api/teddies/${getId}`)
    .then((response) => response.json())
    .then((jsonData) => {
        
        const teddy = setTeddy(jsonData);

        // Initialize item properties
        document.querySelector(".main").id = teddy.id;
        document.querySelector(".left-container figure img").src = teddy.imageUrl;
        document.querySelector(".item-price").textContent = teddy.priceFormated();
        document.querySelector(".item-name").textContent = teddy.name;
        document.querySelector(".item-description").textContent = teddy.description;
        

        // Create html content of one color with API's jsonData
        const dropdownContent = document.querySelector(".dropdown-content");
        
        const createDropdownColors = (colorId) => {
            
            const dropdownColorsHtml = `<a class="flexCenter">${jsonData.colors[colorId]}</a>`;
            dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);
        }
        
        const arrayLength = jsonData.colors.length;
        
        // Render html content for each color in the API's list
        for (let i = 0; i < arrayLength; i++) {
            createDropdownColors(i);
        }    

        // Call the function to change quantity & add item to cart
        onClick_QtyAddCartButton(teddy);
    });
}


// ======================================================================
// Control button "Personaliser"
// ======================================================================
const onClick_CustomButton = () => {

    const customBtn = document.querySelector(".custom-btn");
    const dropCont = document.querySelector(".dropdown-content");
    const dropFlow = document.querySelector(".dropdown-flow");

    // On mouse click "Personaliser" button
    customBtn.addEventListener("click", function() {
        this.style = "border-radius: 20px 20px 0 0";
        dropCont.style = "transform: translateY(0%)";
        dropFlow.style = "height: auto;";
    });

    // On mouse leave dropdown's container
    dropCont.addEventListener("mouseleave", () => {
        dropCont.style = "transform: translateY(-100%)";
        setTimeout(hideDropdownBack, 300);
    });

    const hideDropdownBack = () => {
        customBtn.style = "border-radius: 20px; transition-duration: 0.2s";
        dropFlow.style = "height: 0px";
    }
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderItemProperties();
    onClick_CustomButton();
});