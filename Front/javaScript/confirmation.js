
"use strict"

// ======================================================================
//  Create cart item in confirm page  html code
// ======================================================================
const createConfirmItems = (teddy, teddyColor, teddyQty) => {

    const ulContainer = document.querySelector(".confirm-items-container");

    // Create html content of one item
    const itemListHtml = `
        <li class="flexCenter">
            <figure>
                <img src="${teddy.imageUrl}" alt="ours en peluche faits à la main">
            </figure>
        
            <div class="flexCenter item-caption">
                <h3>${teddy.name}</h3>
                <p>${teddy.description}</p>
            </div>

            <span class="flexCenter confirm-color">${teddyColor}</span>
            
            <div class="flexCenter confirm-price-qty">
                <h3 class="confirm-price">Prix : ${teddy.priceFormated()}</h3>
                <h3 class="flexCenter confirm-qty">Quantité : ${teddyQty}</h3>
            </div>
        </li>`
    ;

    ulContainer.insertAdjacentHTML("beforeend", itemListHtml);
}


// ======================================================================
// Render cart item in confirm page 
// ======================================================================
const renderConfirmItems = () => {

    // Get localStorage's data from new items array
    const confirmArray = JSON.parse(localStorage.getItem("confirmArray"));
        
    // For each teddy in cart
    confirmArray.forEach(item => {
        
        const teddy = setTeddy(item); // Get Teddy data from localStorage
        const teddyQtyObject = item.quantity;

        // Render one Teddy for each pair [Color: quantity]
        for (const [teddyColor, teddyQty] of Object.entries(teddyQtyObject)) {
            createConfirmItems(teddy, teddyColor, teddyQty);
        }
    });
}


// ======================================================================
// Set Data from localStorage to page content 
// ======================================================================
const setOrderPageData = () => {

    // Get Html Class name
    const totalQuantityHtml = document.querySelector(".confirm-qty");
    const totalPriceHtml = document.querySelector(".confirm-price");
    const orderIdHtml = document.querySelector(".order-number");
    const articleHtml = document.querySelector(".article-word");
    
    // Get localStorage's data
    const totalQuantity = localStorage.getItem("totalQuantity");
    const totalPrice = localStorage.getItem("totalPrice");
    const orderId = localStorage.getItem("orderId");

    // Modify DOM content
    totalQuantityHtml.textContent = totalQuantity;
    totalPriceHtml.textContent = totalPrice;
    orderIdHtml.textContent = orderId;
    
    // If more than one item in cart change singular to plurial
    (totalQuantity > 1 )
    ? articleHtml.textContent = "articles."
    : articleHtml.textContent = "article.";
}


// ======================================================================
// Modify confirm order title by viewport
// ======================================================================
const modifyOrderTitleDOM = () => {

    const orderTitle = document.querySelector(".confirm-title h2");
    if(window.matchMedia("(max-width: 630px)").matches) orderTitle.textContent = "Commande envoyée";
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    setOrderPageData();
    renderConfirmItems();
    modifyOrderTitleDOM();
});