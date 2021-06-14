
"use strict"
// console.log("cart JS is loaded");

// ======================================================================
// Control button "Retirer"     (Cart Page)
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
                localStorage.removeItem(event.target.parentElement.id);  // Remove item's data from localStorage
                updateCartItems();  // Update number of items in the cart
                
                // ***************************
                console.log(updateCartItems());

                setTimeout(() => {
                    event.target.parentElement.remove();  // Totally remove the html content after delay
                }, 400);
            }); 
        }
    }
}


// ======================================================================
// Control button "Vider le panier"     (Cart Page)
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
                updateCartItems();  // Update number of items in the cart
                
                setTimeout(() => {
                    listContainer.remove();  // Totally remove the html content after delay
                }, 500);
            };
        });
    }
}

// ======================================================================
// Control button "Passer commande"     (Cart Page)
// ======================================================================
const onClick_Purchase = async () => {
    
    const purchaseBtn = document.querySelector(".purchase-btn");

    if (purchaseBtn) {

        purchaseBtn.addEventListener("click", () => {
            window.location = "./confirmation.html";
        });
    }
}


// ======================================================================
//  Create "Items Cart-list elements" html code     (Cart Pages)
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

                <form class="flexCenter quantity" action="" method="GET">
                    <button class="btn quantity-minus-btn" type="button"> - </button>
                    <button class="btn quantity-plus-btn" type="button"> + </button>

                    <input class="quantity-input" type="number" name="quantity" min="1" max="10" value="${localStorage.getItem(data._id)}">
                </form>

                <button class="btn remove-btn" type="button">Retirer</button>
            </div>
        </li>`
    ;

    ulContainer.insertAdjacentHTML("beforeend", itemListHtml);
}


// ======================================================================
//  Render "Items Cart-list elements" (Cart Pages)
// ======================================================================
const renderItemsCartList = async () => {

    fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((data) => {
        
        const arrayLength = data.length;
        
        // Cycle API's list & render only matching ID in localoStorage
        for (let i = 0; i < arrayLength; i++) {

            const dataItemId = data[i]._id;
            let itemQuantity = localStorage.getItem(dataItemId);

            // If exist data in localStorage => Render these data
            if(itemQuantity !== null) {
                creatCartItem(data[i]);  // Render cart item's html content with API's data
                onClick_Remove();  // Call "remove" function to enable deleting item
                onClick_QtyAddCartButton(dataItemId);  // Call the function to change quantity only
            }
        }
    });
}


// ======================================================================
//  Create New Promise To POST (Model)
// ======================================================================
// function postData(url = '', data = {}) {
    
    //     const response = await fetch(url, {
        //       method: 'POST',
        //       body: JSON.stringify(data)
        //     });
        //     return response.json();
// }
  
// postData('https://example.com/answer', { answer: 42 })
//     .then(data => {
//       console.log(data);
// });


// ======================================================================
// Functions chaining order  (Product Page)
// ======================================================================
const initCartPage = () => {

    renderItemsCartList();
    onClick_EmptyCart();
    onClick_Purchase();
}

initCartPage();

