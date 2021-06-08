
"use strict"

// ======================================================================
// Create "Items list elements" html code (Home Pages)
// ======================================================================
const ulContainer = document.querySelector(".main");

const renderProductList = (data) => {
    const priceNumbered = Number(data.price)/100;
    const priceFormated = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(priceNumbered);

    const productListHtml = `
        <li>
            <a class="flexCenter anchor" id="${data._id}" onClick="returnItemId(this.id)" href="./html/product.html">
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
// Get data from API + Render "Items list elements" (Home Page)
// ======================================================================
const getProductData = () => {
    fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((data) => {

        // *******************************
        let dataArray = Object.keys(data);
        console.log("Type of dataArray : " + typeof(dataArray));
        // *******************************

        // dataArray.lenght

        for (let i = 0; i < 5; i++) {
            renderProductList(data[i]);
        }
    });
}

getProductData();


// ======================================================================
// Link to "Item product page" on Click (Home Page)
// ======================================================================
let itemArrayId;

const returnItemId = (clickedItem) => {
    let itemId = clickedItem;

    const compareWithApiId = () => {
        fetch("http://localhost:3000/api/teddies")
        .then((response) => response.json())
        .then((data) => {
            
            // *******************************
            // *******************************

            for (let i = 0; i < 5; i++) {

                if(itemId === data[i]._id) {
                    itemArrayId = i;
                    console.log(itemArrayId);
                }
            }
        });
    }

    compareWithApiId();
}
