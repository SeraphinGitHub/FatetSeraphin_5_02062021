
"use strict"

// ======================================================================
// Class Cart "Items in cart"
// ======================================================================
class CartClass {

    constructor () {
        this.items = JSON.parse(localStorage.getItem("cartArray")) || [];
    }



    // ======================================================================
    // Get data from localStorage
    // ======================================================================
    getItems() {
        return this.items;
    }



    // ======================================================================
    // Add item to Cart
    // ======================================================================
    addItem(teddy) {
        
        const inputClass = document.querySelector(".quantity-input"); // Get input field's Product Page
        let quantityValue = Number (inputClass.value);
        const resetValue = 1;
        
        const minusBtn = document.querySelector(".quantity-minus-btn"); // Get "-" button Product Page
        const plusBtn = document.querySelector(".quantity-plus-btn"); // Get "+" button Product Page
        const minValue = Number (inputClass.min);  // Get min value from input field's attribute
        const maxValue = Number (inputClass.max);  // Get max value from input field's attribute
        
        
        // **********************************************************
        // For FUN !!! ^_^ (I like coding)
        // **********************************************************
            const maxValueAlert = document.querySelector(".max-value-alert");
        
            maxValueAlert.children[0].textContent = maxValue;
            const transitionTime = 1; // ==> (Seconds)
        // **********************************************************


        // =======================================
        // On Click " + " Button in Product Page
        // =======================================
        plusBtn.addEventListener("click", () => {

            // Keep increase quantity value as long as under max value
            if (quantityValue < maxValue) {

                quantityValue++;
                inputClass.value = quantityValue;  // Render value in input's field

                if (quantityValue === maxValue) {  // Grey out "+" button over max value reached
                    plusBtn.style = "background : linear-gradient(to bottom right, lightgray, black)"
                }
            } 
            
            else {
                // maxValueAlert.style = "display: block";
                maxValueAlert.style = `
                    opacity: 100%;
                    transition-duration: ${transitionTime}s
                `;

                setTimeout(() => {
                    maxValueAlert.style = `
                        opacity: 0%;
                        transition-duration: ${transitionTime}s
                    `;
                }, 5000);

                return;  // If max value's reached => stop at max value's value
            }
        });  


        // =======================================
        // On Click " - " Button in Product Page
        // =======================================
        minusBtn.addEventListener("click", () => {

            // Keep decrease quantity value as long as over min value
            if (quantityValue > minValue) {

                quantityValue--;
                inputClass.value = quantityValue;  // Render value in input's field
                plusBtn.style = "background: linear-gradient(to bottom right, greenyellow, rgb(0, 170, 0));"
                
                // maxValueAlert.style = "display: none;";
                maxValueAlert.style = `
                    opacity: 0%;
                    transition-duration: ${transitionTime}s
                `;
            }
            
            else return;  // If min value's reached => stop at min value's value
        });
        

        // =======================================
        // On Click "Add to Cart" in Product Page
        // =======================================
        const addButton = document.querySelector(".cart-add-btn");

        addButton.addEventListener("click", () => {

            let cartArray = this.getItems(); // Get data from localStorage

            const elementMatchId = element => element._id === teddy._id; // Compare ID
            
            // If this item's Id doesn't exist in localStorage ==> Create new Teddy with chosen qty
            if (!cartArray.find(elementMatchId)) {

                teddy.quantity.push(Number (quantityValue)); // Push the chosen qty in the current teddy's qty array
                cartArray.push(teddy); // Push the teddy with new qty value in cartArray 
                localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the hole thing into LS
            }
            
            // If this item's Id already exist in localStorage ==> Just add chosen qty to qty array of current Teddy
            else {
                const teddyIndex = cartArray.findIndex(elementMatchId); // Find the current teddy's index in cartArray
                cartArray[teddyIndex].quantity.push(Number (quantityValue)); // Push the chosen qty in the current teddy's qty array 
                localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the hole thing into LS
            }    

            inputClass.value = resetValue;  // After adding item to cart => restore input field to 1
            quantityValue = resetValue;  // Restore "+ / -" buttons values to 1
            this.setTotalQty();  // (cartClass.js - setTotalQty() ) Update number of items in the cart
            plusBtn.style = "background: linear-gradient(to bottom right, greenyellow, rgb(0, 170, 0));"
        });
    }



    // ======================================================================
    // Control buttons " + / - " per item in Cart Page
    // ======================================================================
    cartQuantityBtn() {

        let cartArray = cart.getItems();

        const quantity = document.getElementsByClassName("quantity");

        // For each "+ / - Btn & input field's" in Cart Page
        for (let i = 0; i < quantity.length; i++) {
            
            const quantity_Indexed = quantity[i];
            const plusBtnCart = quantity_Indexed.querySelector(".quantity-plus-btn");
            const minusBtnCart = quantity_Indexed.querySelector(".quantity-minus-btn");

            // On Click " + " button
            plusBtnCart.addEventListener("click", (event) => {
                
                const button = "+";
                manageQuantity(event, button);
            });


            // On Click " - " button
            minusBtnCart.addEventListener("click", (event) => {

                const button = "-";
                manageQuantity(event, button);
            });
        }


        const manageQuantity = (event, button) => {

            const getParent = event.target.parentElement;
            const getTargetId = getParent.parentElement.id;
            let quantityInput = getParent.querySelector(".quantity-input");
            
            const elementMatchId = element => element._id === getTargetId;
            const teddyIndex = cartArray.findIndex(elementMatchId);
            let qtyArray_indexOne = cartArray[teddyIndex].quantity[0];

            const minValue = Number (quantityInput.min);
            
            if (button === "+") {
                qtyArray_indexOne ++;
            }

            if (quantityInput.value > minValue && button === "-") {
                qtyArray_indexOne --;
            }
            
            quantityInput.value = qtyArray_indexOne;
            cartArray[teddyIndex].quantity.splice(0, 1, qtyArray_indexOne);
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
            
            this.setTotalQty();  // Update number of items in the cart
            this.setTotalPrice();  // Update total price in the cart
        }
    }



    // ======================================================================
    // Remove item from Cart
    // ======================================================================
    removeItem() {

        let cartArray = this.getItems(); // Get data from localStorage

        const removeBtn = document.getElementsByClassName("remove-btn");
        const removeTransition = "transform: translateY(-100%); transition-duration: 0.3s"; // Move <div> up 
        
        // Cycle addEventListener for each "remove button" of the page 
        for (let i = 0; i < removeBtn.length; i++) {
            
            const removeBtn_Indexed = removeBtn[i];
            
            removeBtn_Indexed.addEventListener("click", (event) => {

                const getTargetId = event.target.parentElement.id; // Get cliked element main <div> Id
                const elementMatchId = element => element._id === getTargetId; // Compare ID
                const teddyIndex = cartArray.findIndex(elementMatchId); // Find the current teddy's index in cartArray

                cartArray.splice(teddyIndex, 1); // Delete the "Teddy object" at this index
                localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the hole thing into LS

                event.target.parentElement.style = removeTransition;  // Move <div> up                
                this.setTotalQty();  // Update number of items in the cart
                this.setTotalPrice();  // Update total price in the cart

                setTimeout(() => {
                    event.target.parentElement.remove();  // Totally remove the html content after delay
                }, 400);
            }); 
        }
    }



    // ======================================================================
    // Clear all Cart
    // ======================================================================
    emptyCart() {

        const cleanBtn = document.querySelector(".clean-cart-btn");
        const listContainer = document.querySelector(".list-container");
        const emptyTransition = "transform: translateY(-100%); transition-duration: 0.5s"; // Move <div> up

        cleanBtn.addEventListener("click", () => {

            if (listContainer) {

                listContainer.style = emptyTransition;  // Move <div> up
                localStorage.clear();  // Delete all data from localStorage
                this.setTotalQty();  // Update number of items in the cart
                this.setTotalPrice();  // Update total price in the cart
                
                setTimeout(() => {
                    listContainer.remove();  // Totally remove the html content after delay
                }, 500);
            };
        });
    }



    // ======================================================================
    // Set quantity loop for TotalPrice and TotalQuantity methods
    // ======================================================================
    quantityLoop (total, cartArray, i, priceArg) {
            
        let quantityArray = cartArray[i].quantity;
        total += this.miniQtyLoop(quantityArray) * priceArg;
        
        return total;
    }

    miniQtyLoop(quantityArray) {
        let quantityTotal = 0;
        
        for (let i in quantityArray) {
            quantityTotal += quantityArray[i];
        }

        return quantityTotal;
    }



    // ======================================================================
    // Calculate item's total quantity
    // ======================================================================
    setTotalQty() {
        
        let cartArray = this.getItems();

        const calcTotalQty = () => {
            
            let totalQtyAll = 0;

            if (localStorage.length) {
              
                // For each Teddy in cart Array (LocalStorage)
                for (let i in cartArray) {
                    
                    let quantityTotal = 0;
                    let quantityArray = cartArray[i].quantity;
                    
                    // For each value in this Teddy's quantity Array (LocalStorage)
                    for (let i in quantityArray) {
                        
                        quantityTotal += quantityArray[i];
                    }
                    
                    // Add up every value in this Teddy's quantity Array
                    totalQtyAll += quantityTotal;
                }

                return totalQtyAll;
            }

            else return totalQtyAll;

            // *******************************************************
            // let totalQtyAll = 0;

            // for (let i in cartArray) {

            //     this.quantityLoop (totalQtyAll, cartArray, i, 1);
            // }

            // return totalQtyAll;
        }

        // Display the "total" calculated value in the cart html element
        const cartItemsDiv = document.querySelector(".cart-items");
        cartItemsDiv.textContent = calcTotalQty();
    }



    // ======================================================================
    // Calculate cart's total price 
    // ======================================================================
    setTotalPrice() {

        let cartArray = this.getItems();
    
        const calcTotalPrice = () => {
            
            let totalPrice = 0;

            if (localStorage.length) {

                // For each Teddy in cart Array (LocalStorage)
                for (let i in cartArray) {
    
                    let quantityArray = cartArray[i].quantity;
                    let teddyPrice = cartArray[i].price;
                    let quantityTotal = 0;
                    
                    // For each value in this Teddy's quantity Array (LocalStorage)
                    for (let i in quantityArray) {
    
                        quantityTotal += quantityArray[i];
                    }
                    
                    // Add up every value in this Teddy's quantity Array, then multipled by this Teddy's price
                    totalPrice += quantityTotal * teddyPrice;
                }

                return totalPrice;
            }

            else return totalPrice;

            // *******************************************************
            // let totalPrice = 0;

            // for (let i in cartArray) {

            //     this.quantityLoop (totalPrice, cartArray, i, teddyPrice);
            // }

            // return totalPrice;
        }
        
        // Turn the total price value into a currency (Cart Page)
        const currencyTotalPrice = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(calcTotalPrice()/100);

        // Display total price in "Total" html container (Cart Page)
        const totalPriceDiv = document.querySelector(".total-price");
        totalPriceDiv.textContent = currencyTotalPrice;
    }


    
    // ======================================================================
    // Access to form page to confirm order
    // ======================================================================
    purchase() {
        
        const purchaseBtn = document.querySelector(".purchase-btn");
        const purchasePageFlow = document.querySelector(".purchase-page-flow");
        const purchasePage = document.querySelector(".purchase-page");
        const cancelPageBtn = document.querySelector(".cancel-order-btn");

        const duration = 0.5;  // ==> (Seconds)
        const timeOutDuration = duration * 600;

        // On Click "Passer Commander" button ==> Show confirm order page (Form)
        if (purchaseBtn) {

            purchaseBtn.addEventListener("click", () => {
    
                purchasePageFlow.style = `
                    visibility: visible;
                `;
    
                purchasePage.style = `
                    transform: translateY(0%);
                    transition-duration: ${duration}s;
                `;
    
                setTimeout(() => {
    
                    purchasePage.style = `
                        border-radius: 0;
                        transform: translateY(0%);
                        transition-duration: ${duration}s;
                    `;
                }, timeOutDuration);
            });
    
    
            // On Click "Annuler" button ==> Hide confirm order page
            cancelPageBtn.addEventListener("click", () => {
    
                purchasePage.style = `
                    border-radius: 50% 50% 0 0;
                    transform: translateY(0%);
                    transition-duration: ${duration}s;
                `;
    
                setTimeout(() => {
                    
                    purchasePage.style = `
                    transform: translateY(100%);
                    transition-duration: ${duration}s;
                    `;
                    
                    purchasePageFlow.style = `
                        visibility: hidden;
                    `;
                }, timeOutDuration);
            });
        }
    }


    
    // ======================================================================
    // Confirm form page and order command
    // ======================================================================
    getCustomerInfos() {

        const contact = document.querySelector(".contact");
        const contactData = new FormData(contact);

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const email = document.getElementById("email");
        
        // contactData.append("firstName", firstName.value);
        // contactData.append("lastName", lastName.value);
        // contactData.append("address", address.value);
        // contactData.append("address", address.value);
        // contactData.append("city", city.value);
        // contactData.append("email", email.value);

        let firstName_field = firstName.value
        let lastName_field = lastName.value
        let address_field = address.value
        let city_field = city.value
        let email_field = email.value

        contactData.firstName = firstName_field;
        contactData.lastName = lastName_field;
        contactData.address = address_field;
        contactData.city = city_field;
        contactData.email = email_field;

        // *********************************************
        localStorage.setItem("contactData", JSON.stringify(contactData));
        // *********************************************

        // console.log(contactData);

        // firstName.addEventListener("input", () =>{
            
        //     if (firstName.validity.valid) {
        //         alert("aze")
        //     }

        // }, false);

        return contactData;
    }



    // ======================================================================
    // Confirm form page and order command
    // ======================================================================
    confirm() {

        const confirmBtn = document.querySelector(".confirm-order-btn");

        confirmBtn.addEventListener("click", (event) => {
            
            event.preventDefault();

            const contact = this.getCustomerInfos();
            const products = this.getItems();

            // ************************************************************
            // POST Function
            // ************************************************************

            console.log(contact);
            console.log(products);

            postData_API(contact, products);


            
        });
        
    }
}


const setCartClass = () => {

    let cart = new CartClass (
        this.items
    );

    return cart
}


// ======================================================================
// Set Cart method to callable functions
// ======================================================================
const cart = setCartClass();


// On Click button - "Add" or "+ / -" (Product Page)
const addItem = (teddy) => {
    cart.addItem(teddy);
}


// On Click button - "+ / -" (Cart Page)
const cartQuantityBtn = () => {
    cart.cartQuantityBtn();
}


// On Click button - "Retirer" (Cart Page)
const removeItem = () => {
    cart.removeItem();
}


// On Click button - "Vider le panier" (Cart Page)
const emptyCart = () => {
    cart.emptyCart();
}


// Update Total cart quantity (All Pages)
const updateTotalQty = () => {
    cart.setTotalQty();
}


// Update Total cart price (Cart Page)
const updateTotalPrice = () => {
    cart.setTotalPrice();
}


// On Click button - "Passer commande" (Cart Page)
const purchase = () => {
    cart.purchase();
}


// On Click button - "Confirmer commande" (Cart Page)
const confirm = () => {
    cart.confirm();
}