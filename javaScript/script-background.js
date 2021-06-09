
"use strict"

// ======================================================================
// Render & Recycle "Header" html code (All Pages)
// ======================================================================
const headerContainer = document.querySelector("header");

const createHeader = (home, cart) => {

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

            <h3 class="flexCenter cart-items">123</h3>
        </a>`
    ;
    
    headerContainer.insertAdjacentHTML("beforeend", headerHtml);
}

// From index
const homeIndex = "/index.html";
const cartIndex = "/html/cart.html";

// From html folder
const homeOther = "../index.html";
const cartOther = "./cart.html";

const checkLinks = (homeIndex, cartIndex, homeOther, cartOther) => {
    (window.location.pathname === homeIndex)
    ? createHeader(homeIndex, cartIndex)
    : createHeader(homeOther, cartOther);
}

checkLinks(homeIndex, cartIndex, homeOther, cartOther);


// ======================================================================
// Render & Recycle "Footer" html code (All Pages)
// ======================================================================
const footerContainer = document.querySelector("footer");

const footerHtml = `<h2>ORINOCO - Site de vente en ligne</h2>`;

footerContainer.insertAdjacentHTML("beforeend", footerHtml);