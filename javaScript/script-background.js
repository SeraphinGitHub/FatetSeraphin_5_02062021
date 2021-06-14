
"use strict"
// console.log("background JS is loaded");

// ======================================================================
// Class "Item properties"      (All Pages)
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
// Create & Render "Header" html code       (All Pages)
// ======================================================================
const createHeader = async (home, cart) => {
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
// Create & Render "Footer" html code       (All Pages)
// ======================================================================
const renderFooter = async () => {

    const footerContainer = document.querySelector("footer");
    
    // Recycle footer's html content
    const footerHtml = `<h2>ORINOCO - Site de vente en ligne</h2>`;

    footerContainer.insertAdjacentHTML("beforeend", footerHtml);
}


// ======================================================================
// Sum "All item quantity" cart shop        (All Pages)
// ======================================================================
const updateCartItems = () => {

    fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((data) => {
        
        const dataLength = data.length;
        
        const qtyArrayLoop = (itemArray) =>{
            
            // Get quantity of each item per ID from localStorage
            for (let i = 0; i < dataLength; i++) {
                
                const itemId = data[i]._id;
                let itemQuantity = localStorage.getItem(itemId);
                
                // If localStorage ID & quantity exist => push each quantity value in "itemArray"
                if(itemQuantity !== null) {
                    itemArray.push(itemQuantity)
                    console.log(itemArray);
                }
                
                else return itemArray;
            }
        }
        
        let itemArray = [];
        const qtyArray = qtyArrayLoop(itemArray);
        
        // Add up all values of "itemArray" to calculate "total" item amount in cart shop
        const totalQty = () => {
            let total = 0;
            
            for (let i in qtyArray) {
                total += Number (qtyArray[i]);
            }

            return total;
        }

        // Display the "total" calculated value in the cart html element
        const cartItems = document.querySelector(".cart-items");
        cartItems.textContent = totalQty();
    });
}


// ======================================================================
// Functions chaining order     (All Page)
// ======================================================================
const initBackground = () => {

    updateCartItems();
    renderHeader();
    renderFooter();
}

initBackground();