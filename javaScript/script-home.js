
"use strict"

// ======================================================================
// Create "Items list elements" html code
// ======================================================================
const creatProductList = (teddy) => {

    const ulContainer = document.querySelector(".main");
    
    // Create html content of one item with API's data
    const productListHtml = `
        <li>
            <a class="flexCenter anchor" id="${teddy.id}" href="./html/product.html?_id=${teddy.id}">
                <figure>
                    <img src="${teddy.imageUrl}" alt="ours en peluche faits à la main">
                </figure>

                <h3 class="flexCenter item-price">${teddy.priceFormated()}</h3>
                
                <div class="flexCenter item-caption">
                    <h3>${teddy.name}</h3>
                    <p>${teddy.description}</p>
                </div>
            </a>
        </li>`
    ;

    ulContainer.insertAdjacentHTML("beforeend", productListHtml);
}


// ======================================================================
// Render "Items list elements"
// ======================================================================
const renderProductList = () => {

    fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((jsonData) => {

        const jsonDataLength = jsonData.length;

        // Render html content for each item in the API's list
        for (let i = 0; i < jsonDataLength; i++) {
            
            const teddy = setTeddy(jsonData[i]);
            creatProductList(teddy);
        }
    });
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    renderProductList();
});