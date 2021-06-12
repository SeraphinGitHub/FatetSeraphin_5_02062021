
"use strict"

// ======================================================================
// Create & Render "Header" html code (All Pages)
// ======================================================================
const createHeader = async (home, cart) => {
    const headerContainer = document.querySelector("header");
    
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


const renderHeader = async () => {
    // From index
    const homeIndex = "/index.html";
    const cartIndex = "/html/cart.html";
    
    // From html folder
    const homeOther = "../index.html";
    const cartOther = "./cart.html";

    const checkLinks = (homeIndexArg, cartIndexArg, homeOtherArg, cartOtherArg) => {
        (window.location.pathname === homeIndexArg)
        ? createHeader(homeIndexArg, cartIndexArg)
        : createHeader(homeOtherArg, cartOtherArg);
    }

    checkLinks(homeIndex, cartIndex, homeOther, cartOther);
}


// ======================================================================
// Create & Render "Footer" html code (All Pages)
// ======================================================================
const renderFooter = async () => {

    const footerContainer = document.querySelector("footer");
    const footerHtml = `<h2>ORINOCO - Site de vente en ligne</h2>`;

    footerContainer.insertAdjacentHTML("beforeend", footerHtml);
}


// ======================================================================
// Cart items Reset on load (All Pages)
// ======================================================================
const cartReset = async () => {
    const cartItems = document.querySelector(".cart-items");

    window.addEventListener("load", () => {
        cartItems.textContent = 0;
    });
}


// ======================================================================
// Final chain promises order  (Product Page)
// ======================================================================
const initBackground = () => {
    renderHeader()
    .then(() => {return cartReset()})
    .then(() => {return renderFooter()});
}

initBackground();