
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
                                                            // **********
            const dropdownColorsHtml = `<a class="flexCenter">${teddy.colors[colorId]}</a>`;
            dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);
        }
                        // **********
        const arrayLength = teddy.colors.length;
        
        // Render html content for each color in the API's list
        for (let i = 0; i < arrayLength; i++) {
            createDropdownColors(i);
        }

        addItem(teddy); // CartClass "Add" & "+ / -" buttons
    });
}


// ======================================================================
// Control button "Personaliser"
// ======================================================================
const customButton = () => {

    const customBtn = document.querySelector(".custom-btn");
    const dropCont = document.querySelector(".dropdown-content");
    const dropFlow = document.querySelector(".dropdown-flow");

    const duration = 0.6;  // ==> (Seconds)


    // On mouse click "Personaliser" button
    customBtn.addEventListener("click", function() {

        dropFlow.style = "visibility: visible";
        this.style = "border-radius: 20px 20px 0 0";
        
        dropCont.style = `
            transform: translateY(0%);
            transition-duration: ${duration}s;
        `;
    });


    // On mouse leave dropdown's container
    dropCont.addEventListener("mouseleave", () => {
        
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
    customButton();
});