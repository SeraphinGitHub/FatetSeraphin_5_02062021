
"use strict"

// ======================================================================
// Simplify "fetch call function" ==> "GET" Method (All Pages)
// ======================================================================
const apiUrl = "http://localhost:3000/api/teddies";

const getDataFromApi = async (url) => {
    
    const response = await fetch(url).then((response) => response.json());
    return response;
}



// *****  Bear colors's Choice  *****
let itemArrayId = 0;
// **********************************

// ======================================================================
// Render "Item properties" (Product Page)
// ======================================================================
const renderItemProperties = async () => {

    getDataFromApi(apiUrl).then((data) => {

        // *************************
        const arrayId = data[itemArrayId];
        // *************************

        const priceNumbered = Number (arrayId.price)/100;
        const priceFormated = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(priceNumbered);

        document.querySelector(".left-container figure img").src = arrayId.imageUrl;
        document.querySelector(".item-price").textContent = priceFormated;
        document.querySelector(".item-name").textContent = arrayId.name;
        document.querySelector(".item-description").textContent = arrayId.description;
    });
}


// ======================================================================
// Create & Render "Colors dropdown" html code (Product Pages)
// ======================================================================
const renderDropdownColors = async () => {

    const dropdownContent = document.querySelector(".dropdown-content");

    const createDropdownColors = (data, colorId) => {
        const dropdownColorsHtml = `<a class="flexCenter color-3">${data.colors[colorId]}</a>`;
        dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);
    }

    getDataFromApi(apiUrl).then((data) => {

        // *************************
        const arrayId = data[itemArrayId];
        // *************************

        const arrayLength = arrayId.colors.length;

        for (let i = 0; i < arrayLength; i++) {
            createDropdownColors(arrayId, i);
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
    customBtn.addEventListener("click", () => {
        customBtn.style = "border-radius: 20px 20px 0 0";
        dropCont.style = "transform: translateY(0%)";
        dropFlow.style = "height: 260px;";
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
const init = () => {
    renderItemProperties()
    .then(() => {return renderDropdownColors()})
    .then(() => {return onClick_CustomButton()});
}

init();




// query Parameter >>> click page item to give ID for Product page

//  POO >>> regarder (Class JavaScript)