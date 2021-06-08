
"use strict"

// ======================================================================
// Create "Product page" html code (Product Pages)
// ======================================================================
const sectionContainer = document.querySelector(".main");

const renderProductPage = (data) => {
    const priceNumbered = Number(data.price)/100;
    const priceFormated = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(priceNumbered);
    
    const productPageHtml = `
        <div class="flexCenter left-container">
            <div class="custom-dropdown">
                <button class="btn custom-btn" type="button">Personaliser</button>
                
                <div class="dropdown-flow">
                    <div class="flexCenter dropdown-content">
                    </div>
                </div>
            </div>

            <figure>
                <img src="${data.imageUrl}" alt="ours en peluche faits à la main">
            </figure>
        </div>
            
        <div class="flexCenter right-container">
            <h3 class="item-price">${priceFormated}</h3>
            
            <div class="flexCenter item-caption">
                <h3>${data.name}</h3>
                <p>${data.description}</p>
            </div>
            
            <div class="flexCenter qnt-add-tag">
                <form class="flexCenter quantity" action="" method="GET">
                    <label class="flexCenter btn quantity-label" for="quant">Quantité</label>
                        
                    <input class="quantity-input" type="number" name="quant" id="quant" min="1" max="100" value="1">
                </form>

                <button class="btn add-btn" type="submit">Ajouter au panier</button>
            </div>
        </div>`
    ;

    sectionContainer.insertAdjacentHTML("beforeend", productPageHtml);
}

// ======================================================================
// Promises "Get data from API" + Create "List product" (Home Page)
// ======================================================================

// *************************
let itemArrayId = 0;
// *************************

const getProductData = (arrayId) => {
    fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((data) => renderProductPage(data[arrayId]));
}

getProductData(itemArrayId);


// ======================================================================
// Create "Colors dropdown" html code (Product Pages)
// ======================================================================
setTimeout (() => {
    const dropdownContent = document.querySelector(".dropdown-content");

    const renderColorsDropdown = (data, colorId) => {
        const colorsDropdownHtml = `<a class="flexCenter color-3">${data.colors[colorId]}</a>`;
        dropdownContent.insertAdjacentHTML("beforeend", colorsDropdownHtml);
    }

    const getColorsData = (arrayId) => {
        fetch("http://localhost:3000/api/teddies")
        .then((response) => response.json())
        .then((data) => {

            // ***************************
            let colorArray = Object.keys(data[arrayId].colors);
            console.log("Type of colorArray : " + typeof(colorArray));
            // ***************************

            // colorArray.lenght

            for (let i = 0; i < 4; i++) {
                renderColorsDropdown(data[arrayId], i);
            }
        });
    }

    getColorsData(itemArrayId);

}, 100);


// ======================================================================
// Control "Personaliser" button (Product Page)
// ======================================================================
setTimeout (() => {
    const customBtn = document.querySelector(".custom-btn");
    const dropCont = document.querySelector(".dropdown-content");
    const dropFlow = document.querySelector(".dropdown-flow");

    // Mouse OnClick
    customBtn.addEventListener("click", () => {
            customBtn.style = "border-radius: 20px 20px 0 0";
            dropCont.style = "transform: translateY(0%)";
            dropFlow.style = "height: 260px;";
        }
    );

    // Mouse out of container
    dropCont.addEventListener("mouseleave", () => {
        repackDropdown();
    }
    );

    const repackDropdown = () => {
        dropCont.style = "transform: translateY(-100%)";
        setTimeout(hideDropdownBack, 300);
    }

    const hideDropdownBack = () => {
        customBtn.style = "border-radius: 20px; transition-duration: 0.2s";
        dropFlow.style = "height: 0px";
    }

}, 100);