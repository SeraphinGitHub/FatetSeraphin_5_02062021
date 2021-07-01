
"use strict"

// ======================================================================
// 
// ======================================================================
const deleteOrderId = () => {

    const confirmPath = "/Front/html/confirmation.html";
    
    if(window.location.pathname === confirmPath) {
        const cart = document.querySelector(".cart")

        cart.addEventListener("click", () => {
            localStorage.removeItem("orderId");
        });
    }
}


// ======================================================================
// Functions chaining order
// ======================================================================
window.addEventListener("load", () => {
    deleteOrderId();
});