
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

    let itemData_home = new ItemData(
        data.colors,
        data._id,
        data.name,
        data.price, 
        data.imageUrl,
        data.description,
        new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(Number (data.price)/100)
    );

    const ulContainer = document.querySelector(".main");
    
    const productListHtml = `
        <li>
            <a class="flexCenter anchor" href="./html/product.html?_id=${data._id}">
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