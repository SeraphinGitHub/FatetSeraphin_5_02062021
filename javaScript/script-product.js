
"use strict"

// ======================================================================
// Simplify "fetch call function" ==> "GET" Method (All Pages)
// ======================================================================
const apiUrl = "http://localhost:3000/api/teddies";

const getDataFromApi = async (url) => {
    
    const response = await fetch(url).then((response) => response.json())
    return response;
}


const renderItemProperties = async () => {
    
    const pageParams = new URLSearchParams(window.location.search);
    const getId = pageParams.get("_id");
    
    getDataFromApi(`http://localhost:3000/api/teddies/${getId}`).then((data) => {
            
        let itemData_product = new ItemData(
            data.colors,
            data._id,
            data.name,
            data.price, 
            data.imageUrl,
            data.description,
            new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(Number (data.price)/100)
        );


        // ====== Properties ======
        document.querySelector(".left-container figure img").src = itemData_product.imageUrl;
        document.querySelector(".item-price").textContent = itemData_product.priceFormated;
        document.querySelector(".item-name").textContent = itemData_product.name;
        document.querySelector(".item-description").textContent = itemData_product.description;
        

        // ====== Colors ======
        const dropdownContent = document.querySelector(".dropdown-content");
        
        const createDropdownColors = (colorId) => {
            
            const dropdownColorsHtml = `<a class="flexCenter">${itemData_product.colors[colorId]}</a>`;
            dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);
        }
        
        const arrayLength = itemData_product.colors.length;
        
        for (let i = 0; i < arrayLength; i++) {
            createDropdownColors(i);
        }
    });
}


// ======================================================================
// Control button "Personaliser"  (Product Page)
// ======================================================================
const onClick_CustomButton = async () => {

    const customBtn = document.querySelector(".custom-btn");
    const dropCont = document.querySelector(".dropdown-content");
    const dropFlow = document.querySelector(".dropdown-flow");

    // Mouse OnClick
    customBtn.addEventListener("click", function() {
        this.style = "border-radius: 20px 20px 0 0";
        dropCont.style = "transform: translateY(0%)";
        dropFlow.style = "height: auto;";
    });

    // Mouse out of container
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
// Final chain promises order  (Product Page)
// ======================================================================
const initProductPage = () => {

    renderItemProperties();
    onClick_CustomButton();
}

initProductPage();