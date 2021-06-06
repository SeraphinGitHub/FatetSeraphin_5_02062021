
"use strict"

//  =====  Control "Retirer" button (Cart Page) =====
const removeBtn = document.getElementsByClassName("remove-btn");
const removeTransition = "transform: translateY(-100%); transition-duration: 0.3s";

for (let i = 0; i < removeBtn.length; i++) {
    
    removeBtn[i].addEventListener("click", function(event) {
        event.target.parentElement.style = removeTransition;
        
        setTimeout(function() {
            event.target.parentElement.remove()
        }, 500);
    }); 
}


//  =====  Control "Vider le panier" button (Cart Page) =====
const cleanBtn = document.querySelector(".clean-cart-btn");

cleanBtn.addEventListener("click", function() {
    if (document.querySelector(".list-container")) {
        document.querySelector(".list-container").style = removeTransition;

        setTimeout(function() {
            document.querySelector(".list-container").remove()
        }, 500);
    };
});