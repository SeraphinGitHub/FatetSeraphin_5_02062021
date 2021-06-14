
"use strict"
// console.log("product JS is loaded");

// ======================================================================
// Render "Item properties"     (Product Page)
// ======================================================================
const renderItemProperties = async () => {
    
    const pageParams = new URLSearchParams(window.location.search);
    const getId = pageParams.get("_id");
    
    // Get data tranfered from Query String to initialize item content 
    fetch(`http://localhost:3000/api/teddies/${getId}`)
    .then((response) => response.json())
    .then((data) => {
            
        let itemData_product = new ItemData(
            data.colors,
            data._id,
            data.name,
            data.price, 
            data.imageUrl,
            data.description,

            // Turn API's price number value into a currency price
            new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(Number (data.price)/100)
        );


        // Initialize item properties
        document.querySelector(".main").id = data._id;
        document.querySelector(".left-container figure img").src = itemData_product.imageUrl;
        document.querySelector(".item-price").textContent = itemData_product.priceFormated;
        document.querySelector(".item-name").textContent = itemData_product.name;
        document.querySelector(".item-description").textContent = itemData_product.description;
        

        // Create html content of one color with API's data
        const dropdownContent = document.querySelector(".dropdown-content");
        
        const createDropdownColors = (colorId) => {
            
            const dropdownColorsHtml = `<a class="flexCenter">${itemData_product.colors[colorId]}</a>`;
            dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);
        }
        
        const arrayLength = itemData_product.colors.length;
        
        // Render html content for each color in the API's list
        for (let i = 0; i < arrayLength; i++) {
            createDropdownColors(i);
        }    

        // Call the function to change quantity & add item to cart
        onClick_QtyAddCartButton(getId);
    });
}


// ======================================================================
// Control button "Personaliser"  (Product Page)
// ======================================================================
const onClick_CustomButton = async () => {

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
// Functions chaining order  (Product Page)
// ======================================================================
const initProductPage = () => {

    renderItemProperties();
    onClick_CustomButton();
}

initProductPage();