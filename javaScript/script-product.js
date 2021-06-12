
"use strict"

// ======================================================================
// Simplify "fetch call function" ==> "GET" Method (All Pages)
// ======================================================================
const getDataFromApi = async (url) => {
    
    const response = await fetch(url).then((response) => response.json());
    return response;
}


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


const renderItemProperties = async () => {
    
    const pageParams = new URLSearchParams(window.location.search)
    const getId = pageParams.get("_id");
    
    const itemProperties = getDataFromApi(`http://localhost:3000/api/teddies/${getId}`).then((data) => {
        
        let itemData_1 = new ItemData(
            data.colors,
            data._id,
            data.name,
            data.price, 
            data.imageUrl,
            data.description,
            new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(Number (data.price)/100)
        );

        // ====== Properties ======
        document.querySelector(".left-container figure img").src = itemData_1.imageUrl;
        document.querySelector(".item-price").textContent = itemData_1.priceFormated;
        document.querySelector(".item-name").textContent = itemData_1.name;
        document.querySelector(".item-description").textContent = itemData_1.description;

        // ====== Colors ======
        const dropdownContent = document.querySelector(".dropdown-content");
        
        const createDropdownColors = (colorId) => {
            
            const dropdownColorsHtml = `<a class="flexCenter">${itemData_1.colors[colorId]}</a>`;
            dropdownContent.insertAdjacentHTML("beforeend", dropdownColorsHtml);
        }
        
        const arrayLength = itemData_1.colors.length;

        for (let i = 0; i < arrayLength; i++) {
            createDropdownColors(i);
        }
    });

    return itemProperties;
}


// ======================================================================
// Control button "Personaliser"  (Product Page)
// ======================================================================
const onClick_CustomButton = async () => {

    const customBtn = document.querySelector(".custom-btn");
    const dropCont = document.querySelector(".dropdown-content");
    const dropFlow = document.querySelector(".dropdown-flow");

    // Mouse OnClick
    customBtn.addEventListener("click", function() {
        this.style = "border-radius: 20px 20px 0 0";
        dropCont.style = "transform: translateY(0%)";
        dropFlow.style = "height: auto;";
    });

    // Mouse out of container
    dropCont.addEventListener("mouseleave", () => {
        dropCont.style = "transform: translateY(-100%)";
        setTimeout(hideDropdownBack, 300);
    });

    const hideDropdownBack = () => {
        customBtn.style = "border-radius: 20px; transition-duration: 0.2s";
        dropFlow.style = "height: 0px";
    }
}


// ======================================================================
// Control button "+ / -"  (Product Page)
// ======================================================================
const onClick_PlusMinusButton = async () => {

    const quantInput = document.querySelector(".quantity-input");
    const plusBtn = document.querySelector(".quantity-plus-btn");
    const minusBtn = document.querySelector(".quantity-minus-btn");

    const minValue = Number (quantInput.min);
    const maxValue = Number (quantInput.max);
    const quantValue = Number (quantInput.value);
    
    let clickCount = 0;

    plusBtn.addEventListener("click", () => {
        if (quantValue + clickCount < maxValue) {
            clickCount++;
            quantInput.value = quantValue + clickCount;
        }

    });
    
    minusBtn.addEventListener("click", () => {
        if (quantValue + clickCount > minValue) {
            clickCount--;
            quantInput.value = quantValue + clickCount;
        }
    });
}


// ======================================================================
// Control button "Ajouter au panier"  (Product Page)
// ======================================================================
const onClick_addToCartButton = async () => {

    const addButton = document.querySelector(".cart-add-btn");
    const cartItems = document.querySelector(".cart-items");
    const quantInput = document.querySelector(".quantity-input").value;
    
    let azerty = 0;

    addButton.addEventListener("click", () => {
        cartItems.textContent = quantInput * azerty++;

        console.log("quantInput " + quantInput);
    });
}


// ======================================================================
// Final chain promises order  (Product Page)
// ======================================================================
const initProductPage = () => {
    renderItemProperties()
    .then(() => {return onClick_CustomButton()})
    .then(() => {return onClick_PlusMinusButton()})
    .then(() => {return onClick_addToCartButton()});
}

initProductPage();