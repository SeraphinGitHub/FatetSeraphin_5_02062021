
"use strict"

// ======================================================================
// Simplify "fetch call function" ==> "GET" Method (All Pages)
// ======================================================================
const apiUrl = "http://localhost:3000/api/teddies";

const getDataFromApi = async (url) => {
    
    const response = await fetch(url).then((response) => response.json())
    return response;
}


// ======================================================================
// Create "Items list elements" html code (Home Pages)
// ======================================================================
const creatProductList = async (data) => {

    const ulContainer = document.querySelector(".main");
    const priceNumbered = Number(data.price)/100;
    const priceFormated = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(priceNumbered);

    const productListHtml = `
        <li>
            <a class="flexCenter anchor" id="${data._id}" href="./html/product.html?_id=${data._id}">
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
// Get data from API + Render "List" (Home Page)
// ======================================================================
const renderProductList = async () => {

    getDataFromApi(apiUrl).then((data) => {
        const arrayLength = data.length;
    
        for (let i = 0; i < arrayLength; i++) {
            creatProductList(data[i]);
        }
    });
}


// ======================================================================
// Final chain promises order  (Product Page)
// ======================================================================
const initHomePage = () => {
    renderProductList();
}

initHomePage();