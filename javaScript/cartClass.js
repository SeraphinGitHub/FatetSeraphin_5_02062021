
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
    // Handle "Add to Cart" button
    // ======================================================================
    addItem(teddy, inputClass, plusBtn) {
        
        const resetValue = 1;        
        let quantityValue = Number (inputClass.value);

        const cartArray = this.getItems(); // Get data from localStorage
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
            cartArray[teddyIndex].quantity[0] += Number (quantityValue); // Modify the current value of qty array
            localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the hole thing into LS
        }    

        inputClass.value = resetValue;  // After adding item to cart => restore input field to 1
        quantityValue = resetValue;  // Restore "+ / -" buttons values to 1
        this.updateTotalQty();  // (cartClass.js - updateTotalQty() ) Update number of items in the cart
        plusBtn.style = "background: linear-gradient(to bottom right, greenyellow, rgb(0, 170, 0));"
    }


    // ======================================================================
    // Handle " + " button (not Cart)
    // ======================================================================
    plusBtnProduct(maxValue, inputClass, plusBtn, maxValueAlert, transitionTime) {
        
        let quantityValue = Number (inputClass.value);
        
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
    }


    // ======================================================================
    // Handle " - " button (not Cart)
    // ======================================================================
    minusBtnProduct(minValue, inputClass, plusBtn, maxValueAlert, transitionTime) {
        
        let quantityValue = Number (inputClass.value);
        
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
    }


    // ======================================================================
    // Render Items in Cart
    // ======================================================================
    renderItems(creatCartItem) {
            
        const cartArray = this.getItems();
        
        // For each teddy in cart
        for (const i in cartArray) {

            const teddy = setTeddy(cartArray[i]); // Get Teddy data from localStorage
            const teddyQty = cartArray[i].quantity[0]; //Get Teddy quantity
            creatCartItem(teddy, teddyQty); // Render item in cart
        }
    }


    // ======================================================================
    // Control buttons " + / - " per item in Cart Page
    // ======================================================================
    cartQuantityBtn(event, symbol) {

        const cartArray = cart.getItems();

        const getParent = event.target.parentElement;
        const getTargetId = getParent.parentElement.id;
        const quantityInput = getParent.querySelector(".quantity-input");
        
        const elementMatchId = element => element._id === getTargetId;
        const teddyIndex = cartArray.findIndex(elementMatchId);
        let qtyArray_indexOne = cartArray[teddyIndex].quantity[0];

        const minValue = Number (quantityInput.min);
        
        if (symbol === "+") {
            qtyArray_indexOne ++;
        }

        if (quantityInput.value > minValue && symbol === "-") {
            qtyArray_indexOne --;
        }
        
        quantityInput.value = qtyArray_indexOne;
        cartArray[teddyIndex].quantity.splice(0, 1, qtyArray_indexOne);
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
        
        cart.updateTotalQty();  // Update number of items in the cart
        cart.updateTotalPrice();  // Update total price in the cart
    }


    // ======================================================================
    // Remove item from Cart
    // ======================================================================
    removeItem(event) {

        const cartArray = cart.getItems(); // Get data from localStorage
        const removeTransition = "transform: translateY(-100%); transition-duration: 0.3s"; // Move <div> up
        
        const getTargetId = event.target.parentElement.id; // Get cliked element main <div> Id
        const elementMatchId = element => element._id === getTargetId; // Compare ID
        const teddyIndex = cartArray.findIndex(elementMatchId); // Find the current teddy's index in cartArray

        cartArray.splice(teddyIndex, 1); // Deconste the "Teddy object" at this index
        localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the hole thing into LS

        event.target.parentElement.style = removeTransition;  // Move <div> up                
        cart.updateTotalQty();  // Update number of items in the cart
        cart.updateTotalPrice();  // Update total price in the cart

        setTimeout(() => {
            event.target.parentElement.remove();  // Totally remove the html content after delay
        }, 400);
    }


    // ======================================================================
    // Clear all Cart
    // ======================================================================
    emptyCart(listContainer, emptyTransition) {

        listContainer.style = emptyTransition;  // Move <div> up
        localStorage.clear();  // Deconste all data from localStorage
        this.updateTotalQty();  // Update number of items in the cart
        this.updateTotalPrice();  // Update total price in the cart
        
        setTimeout(() => {
            listContainer.remove();  // Totally remove the html content after delay
        }, 500);
    }


    // ======================================================================
    // Calculate item's total "quantity" or "price"
    // ======================================================================
    calculateTotal(cartArray, total, valueType) {
        
        // If localStorage isn't empty
        if (localStorage.length) {
            
            // For each Teddy in cart Array (LocalStorage)
            for (const i in cartArray) {
                
                const teddyPrice = cartArray[i].price;
                const quantity = cartArray[i].quantity[0];
                
                // Add up every Teddy's quantity in cart
                if (valueType === "quantity") total += quantity;

                // Add up every Teddy's quantity in cart & multiply by Teddy's price value
                if (valueType === "price") total += quantity * teddyPrice;
            }

            return total;
        }

        else return total;
    }


    // ======================================================================
    // Update item's total quantity
    // ======================================================================
    updateTotalQty() {
        const cartArray = this.getItems();
        const totalQtyAll = 0;

        // Display the "total" calculated value in the cart html element
        const cartItemsDiv = document.querySelector(".cart-items");
        cartItemsDiv.textContent = this.calculateTotal(cartArray, totalQtyAll, "quantity");
    }


    // ======================================================================
    // Update cart's total price 
    // ======================================================================
    updateTotalPrice() {
        const cartArray = this.getItems();
        const totalPrice = 0;

        // Turn the total price value into a currency (Cart Page)
        const currencyTotalPrice = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(this.calculateTotal(cartArray, totalPrice, "price")/100);

        // Display total price in "Total" html container (Cart Page)
        const totalPriceDiv = document.querySelector(".total-price");
        totalPriceDiv.textContent = currencyTotalPrice;
    }

    
    // ======================================================================
    // Access to form page to confirm order
    // ======================================================================
    purchase(purchasePageFlow, purchasePage, timeOutDuration, duration) {
        
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
    }


    // ======================================================================
    // Cancel form and return to cart page
    // ======================================================================
    cancelPurchase(purchasePageFlow, purchasePage, timeOutDuration, duration) {

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
    }
    

    // ======================================================================
    // Confirm form page and order command
    // ======================================================================
    confirm(event) {
        
        event.preventDefault();
        const contact = this.getCustomerInfos();
        const cartArray = this.getItems();
        const products = [];

        for (const i in cartArray) {
            products.push(cartArray[i]._id);
        }
        
        
        // ***************************************
        // for (const key of contact.entries()) {
        //     console.log(key[0] + ": " + key[1]);
        // }
        
        // console.log(products);
        // ***************************************
        
        // postData_API(contact, products);
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
        
        contactData.set("firstName", firstName.value);
        contactData.set("lastName", lastName.value);
        contactData.set("address", address.value);
        contactData.set("city", city.value);
        contactData.set("email", email.value);

        this.checkEmptyness(city);
        this.checkEmptyness(email);
        this.checkEmptyness(address);
        this.checkEmptyness(lastName);
        this.checkEmptyness(firstName);
        
        return contactData;
    }

    checkEmptyness(inputField) {
        
        if (inputField.value === "") {
            inputField.focus();
            return false;
        }
    }

    checkFormat(inputField) {

    }
}


const setCartClass = () => {

    const cart = new CartClass (
        this.items
    );

    return cart
}


const cart = setCartClass();