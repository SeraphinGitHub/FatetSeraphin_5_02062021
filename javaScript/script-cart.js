
"use strict"

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
    onClick_Remove();
    onClick_EmptyCart();
    onClick_Purchase();
}

initCartPage();

