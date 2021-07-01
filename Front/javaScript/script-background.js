
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

    const confirmPath = "/Front/html/confirmation.html";
    (window.location.pathname !== confirmPath)
    ? totalQuantityDOM(cart.updateTotalQty())
    : totalQuantityDOM(0);
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
// Clean localStorage From old Order
// ======================================================================
const cleanOldOrder =  () => {

    let orderId = localStorage.getItem("orderId");
    let confirmPage = JSON.parse(localStorage.getItem("confirmPage"));
    let totalPrice = localStorage.getItem("totalPrice");
    let totalQty = localStorage.getItem("totalQuantity");
    
    if (orderId) localStorage.removeItem("orderId");
    if (confirmPage) localStorage.removeItem("confirmPage");
    if(totalPrice) localStorage.removeItem("totalPrice");
    if(totalQty) localStorage.removeItem("totalQuantity");
}


// ======================================================================
// DOM Update Total Quantity
// ======================================================================
const totalQuantityDOM = (quantity) => {    
    const cartItemsDiv = document.querySelector(".cart-items");
    cartItemsDiv.textContent = quantity; // Display item quantity in Cart
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderHeader();
    renderFooter();
});