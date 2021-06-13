
"use strict"

// ======================================================================
// Render "Item properties" (Product Page)
// ======================================================================
class ItemData {
    constructor (colors, id, name, price, imageUrl, description, priceFormated) {
        this.colors = colors;
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.priceFormated = priceFormated;
    }
}


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

            <h3 class="flexCenter cart-items">0</h3>
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
// Final chain promises order  (Product Page)
// ======================================================================
const initBackground = () => {

    renderHeader();
    renderFooter();
}

initBackground();