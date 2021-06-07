
"use strict"

// ======================================================================
// Create "Product list element" html code (Home Pages)
// ======================================================================
const ulContainer = document.querySelector(".main");

const renderProductList = (data) => {
    const priceNumbered = Number(data.price)/100;
    const priceFormated = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(priceNumbered);

    const productListHtml = `
        <li>
            <a class="flexCenter anchor" id="${data.id}" href="./html/product.html">
                <figure>
                    <img src="${data.imageUrl}" alt="ours en peluche faits à la main">
                </figure>

                <h3 class="flexCenter item-price">${priceFormated}</h3>
                
                <div class="flexCenter item-caption">
                    <h3>${data.name}</h3>
                    <p>${data.description}</p>
                </div>
            </a>
        </li>`
    ;

    ulContainer.insertAdjacentHTML("beforeend", productListHtml);
}

// ======================================================================
// Promises "Get data from API" + Create "List product" (Home Page)
// ======================================================================
const getProductData = () => {
    fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((data) => {
        let dataArray = Object.keys(data);
        console.log("dataArray is : " + typeof(dataArray));

        for (let i = 0; i < 5; i++) {
            renderProductList(data[i]);
        }
    });
}

getProductData();