
"use strict"
// console.log("cart JS is loaded");

// ======================================================================
//  Create "Items Cart-list elements" html code
// ======================================================================
const creatCartItem = async (data) => {

    let itemData_cart = new ItemData(
        data.colors,
        data._id,
        data.name,
        data.price, 
        data.imageUrl,
        data.description,

        // Turn API's price number value into a currency price
        new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(Number (data.price)/100)
    );

    const ulContainer = document.querySelector(".list-container");
    
    // Create html content of one cart item with API's data
    const itemListHtml = `
        <li class="flexCenter">
            <div class="flexCenter flow-cart-item" id="${data._id}">
                <a href="./product.html?_id=${data._id}">
                    <figure>
                        <img src="${itemData_cart.imageUrl}" alt="ours en peluche faits à la main">
                    </figure>
                </a>

                <div class="flexCenter item-caption">
                    <h3>${itemData_cart.name}</h3>
                    <p>${itemData_cart.description}</p>
                </div>

                <h3 class="item-price">${itemData_cart.priceFormated}</h3>

                <form class="flexCenter quantity">
                    <button class="flexCenter btn quantity-minus-btn" type="button"> - </button>
                    <button class="flexCenter btn quantity-plus-btn" type="button"> + </button>
                    
                    <input class="quantity-input" type="number" name="quantity" min="1" max="10" value="${localStorage.getItem(data._id)}">
                    
                    <button class="btn validate-btn" type="button">Valider</button>
                </form>

                <button class="btn remove-btn" type="button">Retirer</button>
            </div>
        </li>`
    ;

    ulContainer.insertAdjacentHTML("beforeend", itemListHtml);
}


// ======================================================================
//  Render "Items Cart-list elements"
// ======================================================================
const renderItemsCartList = async () => {

    fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((data) => {
        
        const arrayLength = data.length;
        
        // Cycle API's list & render only matching ID in localoStorage
        for (let i = 0; i < arrayLength; i++) {

            const dataItemId = data[i]._id;

            // *********************
            // console.log("dataItemId "+dataItemId);   // ==> Problem !  Cart items in API order, not by last Add !
            // *********************

            let itemQuantity = localStorage.getItem(dataItemId);
            
            // *********************
            // console.log("itemQuantity "+itemQuantity);
            // *********************

            // If exist data in localStorage => Render these data
            if(itemQuantity !== null) {
                creatCartItem(data[i]);  // Render cart item's html content with API's data
                onClick_Remove();  // Call "remove" function to enable deleting item
                onClick_QtyAddCartButton(dataItemId);  // Call the function to change quantity only
            }
        }

        updateTotalPrice();  // Call the function to update the total cart's price
    });
}


// ======================================================================
// Control button "Retirer"
// ======================================================================
const onClick_Remove = async () => {

    const removeBtn = document.getElementsByClassName("remove-btn");

    if (removeBtn) {

        const removeTransition = "transform: translateY(-100%); transition-duration: 0.3s";
        
        // Cycle event for each "remove button" of the page
        for (let i = 0; i < removeBtn.length; i++) {
            const button = removeBtn[i];
            
            button.addEventListener("click", (event) => {
                event.target.parentElement.style = removeTransition;  // Move <div> up
                localStorage.setItem(event.target.parentElement.id, 0);  // Set item's data to zero before remove
                updateTotalItems();  // (background.js) Update number of items in the cart
                updateTotalPrice();
                
                setTimeout(() => {
                    localStorage.removeItem(event.target.parentElement.id);  // Remove item's data from localStorage
                    event.target.parentElement.remove();  // Totally remove the html content after delay
                }, 400);
            }); 
        }
    }
}


// ======================================================================
// Control button "Vider le panier"
// ======================================================================
const onClick_EmptyCart = async () => {

    const cleanBtn = document.querySelector(".clean-cart-btn");

    if (cleanBtn) {

        const listContainer = document.querySelector(".list-container");
        const emptyTransition = "transform: translateY(-100%); transition-duration: 0.5s";

        cleanBtn.addEventListener("click", () => {

            if (listContainer) {

                listContainer.style = emptyTransition;  // Move <div> up
                localStorage.clear();  // Delete all data from localStorage
                updateTotalItems();  // (background.js) Update number of items in the cart
                updateTotalPrice();
                
                setTimeout(() => {
                    listContainer.remove();  // Totally remove the html content after delay
                }, 500);
            };
        });
    }
}


// ======================================================================
// Control button "Passer commande"
// ======================================================================
const onClick_Purchase = async () => {
    
    const purchaseBtn = document.querySelector(".purchase-btn");

    if (purchaseBtn) {

        purchaseBtn.addEventListener("click", () => {

            // ************************************************************
            // const postData = async ( url = '', data = {}) => {
                
            //     console.log(data);
                
            //     const response = await fetch(url, {
            //         method: 'POST',      
            //         body: JSON.stringify(data), 
            //     });
                
            //     try {
            //         const newData = await response.json();
                    
            //         console.log(newData);
                    
            //         return newData;
            //     }
                
            //     catch(error) {
            //         console.log("error", error);
            //     }
            // }
            // ************************************************************
            
            // postData("http://localhost:3000/api/teddies/order", [data to send]);
        });
    }
}


// ======================================================================
// Update Total cart price
// ======================================================================
const updateTotalPrice = async () => {
    
    const cartItem = document.getElementsByClassName("flow-cart-item");
    
    if (cartItem) {
        
        fetch("http://localhost:3000/api/teddies")
        .then((response) => response.json())
        .then((data) => {

            const calcItemPrice = (itemPriceArray) => {
            
                for (let i = 0; i < cartItem.length; i++) {
                    
                    const itemId = cartItem[i].id;                
                    const itemQty = localStorage.getItem(itemId);  
                    const numberedItemQty = Number (itemQty);

                    const getItemPrice = (argPrice) => {

                        for (let i = 0; i < data.length; i++) {

                            let dataId = data[i]._id;

                            if (dataId === itemId) {
                                argPrice = data[i].price;
                                return argPrice;
                            }
                        }
                    }
                    
                    let argPrice;
                    const itemPrice = getItemPrice(argPrice);
                    let itemTotalPrice = numberedItemQty * itemPrice;
                    itemPriceArray.push(itemTotalPrice);
                }

                return itemPriceArray;
            }
                
            let itemPriceArray = [];
            const calcPriceArray = calcItemPrice(itemPriceArray);

            // Add up all values of "itemPriceArray" to calculate "total" price of cart
            const totalCartPrice = () => {
                let total = 0;
                
                for (let i in calcPriceArray) {
                    total += calcPriceArray[i];
                }

                return total;
            }

            const currencyTotalPrice = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(totalCartPrice()/100);

            const totalPrice = document.querySelector(".total-price");
            totalPrice.textContent = currencyTotalPrice;
        });
    }
}


// ======================================================================
// Functions chaining order
// ======================================================================
const initCartPage = () => {

    renderItemsCartList();
    onClick_EmptyCart();
    onClick_Purchase();
}

initCartPage();

