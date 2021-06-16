
"use strict"
// console.log("home JS is loaded");

// ======================================================================
// Create "Items list elements" html code
// ======================================================================
const creatProductList = async (data) => {

    let itemData_home = new ItemData(
        data.colors,
        data._id,
        data.name,
        data.price, 
        data.imageUrl,
        data.description,
        
        // Turn API's price number value into a currency price
        new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(Number (data.price)/100)
    );

    const ulContainer = document.querySelector(".main");
    
    // Create html content of one item with API's data
    const productListHtml = `
        <li>
            <a class="flexCenter anchor" id="${data._id}" href="./html/product.html?_id=${data._id}">
                <figure>
                    <img src="${itemData_home.imageUrl}" alt="ours en peluche faits à la main">
                </figure>

                <h3 class="flexCenter item-price">${itemData_home.priceFormated}</h3>
                
                <div class="flexCenter item-caption">
                    <h3>${itemData_home.name}</h3>
                    <p>${itemData_home.description}</p>
                </div>
            </a>
        </li>`
    ;

    ulContainer.insertAdjacentHTML("beforeend", productListHtml);
}


// ======================================================================
// Render "Items list elements"
// ======================================================================
const renderProductList = async () => {

    fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((data) => {

        const arrayLength = data.length;
        
        // Render html content for each item in the API's list
        for (let i = 0; i < arrayLength; i++) {
            creatProductList(data[i]);
        }
    });
}


// ======================================================================
// Functions chaining order
// ======================================================================
const initHomePage = () => {

    renderProductList();
}

initHomePage();