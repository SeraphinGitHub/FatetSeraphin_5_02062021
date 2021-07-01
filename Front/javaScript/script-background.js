
"use strict"

// ======================================================================
// Create & Render "Header" html code
// ======================================================================
const createHeader = (home, cart) => {
    const headerContainer = document.querySelector("header");
    
    // Recycle header's html content
    const headerHtml = `
        <a class="flexCenter border-radius orinoco" href="${home}">
            <figure class="logo-orinoco">
                <i class="fas fa-shopping-cart"></i>
            </figure>

            <h1>Orinoco</h1>
        </a>

        <a class="border-radius cart" href="${cart}">
            <p>Panier</p>

            <figure class="logo-cart">
                <i class="fas fa-cart-plus"></i>
            </figure>

            <h3 class="flexCenter cart-items"></h3>
        </a>`
    ;
    
    headerContainer.insertAdjacentHTML("beforeend", headerHtml);
}

const renderHeader = () => {
    
    const cartPath = "/Front/html/cart.html";
   
    // From index
    const slashIndex = "/";
    const homeIndex = "/index.html";
    
    // From html folder
    const homeOther = "../../index.html";

    checkLinks(slashIndex, homeIndex, homeOther, cartPath);
}

const checkLinks = (slashIndex, homeIndex, homeOther, cartPath) => {
    (window.location.pathname === slashIndex || window.location.pathname === homeIndex)
    ? createHeader(homeIndex, cartPath)
    : createHeader(homeOther, cartPath);
}


// ======================================================================
// Create & Render "Footer" html code
// ======================================================================
const renderFooter = () => {

    const footerContainer = document.querySelector("footer");
    
    // Recycle footer's html content
    const footerHtml = `<h2>ORINOCO - Site de vente en ligne</h2>`;

    footerContainer.insertAdjacentHTML("beforeend", footerHtml);
}


// ======================================================================
// Display alert message
// ======================================================================
const popAlertMessage = (messageClass) => {

    messageClass.classList.add("visible");
    messageClass.classList.add("opacity_100");

    setTimeout(() => {
        messageClass.classList.remove("visible");
        messageClass.classList.remove("opacity_100");
    }, 3000);
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderHeader();
    cart.updateTotalQty();
    renderFooter();
});