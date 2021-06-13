
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
// Control button "Retirer" (Cart Page)
// ======================================================================
const onClick_Remove = async () => {

    const removeBtn = document.getElementsByClassName("remove-btn");
    const removeTransition = "transform: translateY(-100%); transition-duration: 0.3s";

    for (let i = 0; i < removeBtn.length; i++) {
        const button = removeBtn[i];
        
        button.addEventListener("click", (event) => {
            event.target.parentElement.style = removeTransition;
            
            setTimeout(() => {
                event.target.parentElement.remove()
            }, 400);
        }); 
    }
}


// ======================================================================
// Control button "Vider le panier" (Cart Page)
// ======================================================================
const onClick_EmptyCart = async () => {

    const cleanBtn = document.querySelector(".clean-cart-btn");
    const listContainer = document.querySelector(".list-container");
    const emptyTransition = "transform: translateY(-100%); transition-duration: 0.5s";

    cleanBtn.addEventListener("click", () => {
        if (listContainer) {
            listContainer.style = emptyTransition;
            localStorage.clear();
            
            setTimeout(() => {
                listContainer.remove()
            }, 500);
        };
    });
}

// ======================================================================
// Control button "Passer commande" (Cart Page)
// ======================================================================
const onClick_Purchase = async () => {
    
    const purchaseBtn = document.querySelector(".purchase-btn");

    purchaseBtn.addEventListener("click", () => {
        window.location = "./confirmation.html";
    });
}


// ======================================================================
//  Create "Items Cart-list elements" html code (Cart Pages)
// ======================================================================
const creatCartItem = async (data) => {

    let itemData_cart = new ItemData(
        data.colors,
        data._id,
        data.name,
        data.price, 
        data.imageUrl,
        data.description,
        new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(Number (data.price)/100)
    );

    const ulContainer = document.querySelector(".list-container");
    
    const itemListHtml = `
        <li class="flexCenter">
            <div class="flexCenter flow-cart-item">
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
    getDataFromApi(apiUrl).then((data) => {
        
        const arrayLength = data.length;

        for (let i = 0; i < arrayLength; i++) {
            let itemQuantity = localStorage.getItem(data[i]._id);
            
            if(itemQuantity) {
                creatCartItem(data[i]);
                onClick_QtyAddCartButton();
                onClick_EmptyCart();
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
// Final chain promises order  (Product Page)
// ======================================================================
const initCartPage = () => {

    renderItemsCartList();
    onClick_Remove();
    onClick_Purchase();
}

initCartPage();

