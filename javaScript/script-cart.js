
"use strict"

// ======================================================================
// Control button "Retirer" (Cart Page)
// ======================================================================
const removeBtn = document.getElementsByClassName("remove-btn");
const removeTransition = "transform: translateY(-100%); transition-duration: 0.3s";

for (let i = 0; i < removeBtn.length; i++) {
    const button = removeBtn[i];
    
    button.addEventListener("click", (event) => {
        event.target.parentElement.style = removeTransition;
        
        setTimeout(() => {
            event.target.parentElement.remove()
        }, 500);
    }); 
}


// ======================================================================
// Control button "Vider le panier" (Cart Page)
// ======================================================================
const cleanBtn = document.querySelector(".clean-cart-btn");
const listContainer = document.querySelector(".list-container");

cleanBtn.addEventListener("click", () => {
    if (listContainer) {
        listContainer.style = removeTransition;

        setTimeout(() => {
            listContainer.remove()
        }, 500);
    };
});