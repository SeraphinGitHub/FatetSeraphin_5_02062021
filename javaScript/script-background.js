
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
    // From index
    const slashIndex = "/";
    const homeIndex = "/index.html";
    const cartIndex = "/html/cart.html";
    
    // From html folder
    const homeOther = "../index.html";
    const cartOther = "/html/cart.html";

    const checkLinks = (slashIndex, homeIndexArg, cartIndexArg, homeOtherArg, cartOtherArg) => {
        (window.location.pathname === slashIndex || window.location.pathname === homeIndexArg)
        ? createHeader(homeIndexArg, cartIndexArg)
        : createHeader(homeOtherArg, cartOtherArg);
    }

    checkLinks(slashIndex, homeIndex, cartIndex, homeOther, cartOther);
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
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderHeader();
    cart.updateTotalQty();
    renderFooter();
});