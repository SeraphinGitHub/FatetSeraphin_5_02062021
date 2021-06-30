
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
    // Display alert message
    // ======================================================================
    popAlertMessage(messageClass) {

        messageClass.classList.add("visible");
        messageClass.classList.add("opacity_100");

        setTimeout(() => {
            messageClass.classList.remove("visible");
            messageClass.classList.remove("opacity_100");
        }, 4000);
    }


    // ======================================================================
    // Manage "Add to Cart" button
    // ======================================================================
    addItem(teddy, inputClass, plusBtn, maxValueAlert) {
        
        const resetValue = 1;        
        let quantityValue = Number (inputClass.value);

        const cartArray = this.getItems(); // Get data from localStorage
        const elementMatchId = element => element._id === teddy._id; // Compare ID
        
        
        // *************************************************************************
        // *************************************************************************
        
        let teddyQtyObj = teddy.quantity;
        let currentColor = teddy.selectedColor;

        if (!cartArray.find(elementMatchId)) {
            
            teddy.colors.forEach(color => teddyQtyObj[color] = 0);
            teddyQtyObj[currentColor] = (teddyQtyObj[currentColor] + Number (quantityValue));
            
            cartArray.push(teddy);
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
        }
        
        else {
            teddyQtyObj[currentColor] = (teddyQtyObj[currentColor] + Number (quantityValue));
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
        }

        // *************************************************************************
        // *************************************************************************

        // // If this item's Id doesn't exist in localStorage ==> Create new Teddy with chosen qty
        // if (!cartArray.find(elementMatchId)) {

        //     teddy.quantity.push(Number (quantityValue)); // Push the chosen qty in the current teddy's qty array
        //     cartArray.push(teddy); // Push the teddy with new qty value in cartArray 
        //     localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the hole thing into LS
        // }

        // // If this item's Id already exist in localStorage ==> Just add chosen qty to qty array of current Teddy
        // else {
        //     const teddyIndex = cartArray.findIndex(elementMatchId); // Find the current teddy's index in cartArray
        //     cartArray[teddyIndex].quantity[0] += Number (quantityValue); // Modify the current value of qty array
        //     localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the hole thing into LS
        // } 

        inputClass.value = resetValue;  // After adding item to cart => restore input field to 1
        quantityValue = resetValue;  // Restore "+ / -" buttons values to 1
        this.updateTotalQty();  // Update number of items in the cart
        plusBtn.classList.remove("greyed-out-btn");

        if (getComputedStyle(maxValueAlert).visibility === "visible") {
            maxValueAlert.classList.remove("visible");
            maxValueAlert.classList.remove("opacity_100");
        }
    }


    // ======================================================================
    // Manage " + " button (not Cart)
    // ======================================================================
    plusBtnProduct(maxValue, inputClass, plusBtn, maxValueAlert) {
        
        let quantityValue = Number (inputClass.value);
        
        // Keep increase quantity value as long as under max value
        if (quantityValue < maxValue) {

            quantityValue++;
            inputClass.value = quantityValue;  // Render value in input's field

            if (quantityValue === maxValue) {  // Grey out "+" button over max value reached
                plusBtn.classList.add("greyed-out-btn");
            }
        } 
        
        else {
            this.popAlertMessage(maxValueAlert);
        }
    }


    // ======================================================================
    // Manage " - " button (not Cart)
    // ======================================================================
    minusBtnProduct(minValue, inputClass, plusBtn, maxValueAlert) {
        
        let quantityValue = Number (inputClass.value);
        
        // Keep decrease quantity value as long as over min value
        if (quantityValue > minValue) {

            quantityValue--;
            inputClass.value = quantityValue;  // Render value in input's field
            plusBtn.classList.remove("greyed-out-btn");

            maxValueAlert.classList.remove("visible");
            maxValueAlert.classList.remove("opacity_100");
        }
        
        else return;  // If min value's reached => stop at min value's value
    }


    // ======================================================================
    // Render Items in Cart
    // ======================================================================
    renderItems(creatCartItem) {
        
        const cartArray = this.getItems();
        
        // For each teddy in cart
        cartArray.forEach(item => {
            
            const teddy = setTeddy(item); // Get Teddy data from localStorage
            const teddyQty = item.quantity[0]; //Get Teddy quantity
            creatCartItem(teddy, teddyQty); // Render item in cart
        });
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
        const getTargetId = event.target.parentElement.id; // Get cliked element main <div> Id
        const elementMatchId = element => element._id === getTargetId; // Compare ID
        
        const teddyIndex = cartArray.findIndex(elementMatchId); // Find the current teddy's index in cartArray
        cartArray.splice(teddyIndex, 1); // Deconste the "Teddy object" at this index
        localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the hole thing into LS

        event.target.parentElement.classList.add("translateY_-100");  // Move <div> up before remove              
        cart.updateTotalQty();  // Update number of items in the cart
        cart.updateTotalPrice();  // Update total price in the cart

        setTimeout(() => {
            event.target.parentElement.parentElement.remove();  // Totally remove the html content after delay
        }, 400);
    }


    // ======================================================================
    // Clear all Cart
    // ======================================================================
    emptyCart(listContainer) {

        listContainer.classList.add("translateY_-100");  // Move <div> up
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
            cartArray.forEach(item => {

                const teddyPrice = item.price;
                const quantity = item.quantity[0];
                
                // Add up every Teddy's quantity in cart
                if (valueType === "quantity") total += quantity;

                // Add up every Teddy's quantity in cart & multiply by Teddy's price value
                if (valueType === "price") total += quantity * teddyPrice;
            });

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
    purchase(purchasePageFlow, purchasePage, timeOutDuration) {
        
        purchasePageFlow.classList.add("visible");
        purchasePage.classList.add("translateY_0");
        setTimeout(() => purchasePage.classList.add("border-radius_0"), timeOutDuration);
    }


    // ======================================================================
    // Cancel form and return to cart page
    // ======================================================================
    cancelPurchase(purchasePageFlow, purchasePage, timeOutDuration) {

        purchasePage.classList.remove("border-radius_0");
        
        setTimeout(() => {
            purchasePage.classList.remove("translateY_0");
            purchasePageFlow.classList.remove("visible")
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

        cartArray.forEach(item => {
            products.push(item._id);
        });

        contact.forEach((key, value) => {
            contact[value] = key;
        });

        postData_API(contact, products);
        console.log(JSON.stringify({contact, products}));
    }
    
    
    // ======================================================================
    // Confirm form page and order command
    // ======================================================================
    getCustomerInfos() {
        
        const contact = document.querySelector(".contact");
        const contactData = new FormData(contact);
        
        // Get input fields by ID
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const email = document.getElementById("email");
        
        // Set contact formData with pairs : keys, values
        contactData.set("firstName", firstName.value);
        contactData.set("lastName", lastName.value);
        contactData.set("address", address.value);
        contactData.set("city", city.value);
        contactData.set("email", email.value);
        

        // Have to contain: LETTER || letter || accent letters || dash
        const firstNameRegEx = new RegExp(/^[A-Za-zÜ-ü-]+$/);
        
        // Have to contain: LETTER || letter || accent letters || spaces || dash
        const lastNameRegEx = new RegExp(/^[A-Za-zÜ-ü\s-]+$/);
        
        // Have to contain: numbers at the begining && LETTER || letter || accent letters || spaces || dash
        const adressRegEx = new RegExp(/^[0-9]+[A-Za-zÜ-ü\s-]+$/);
        
        // Have to contain: 
        //    LETTER || letter || number || dot || under score || dash && at (@) &&
        //    LETTER || letter || number && dot && LETTER || letter
        const emailRegEx = new RegExp(/^[A-Za-z0-9\._-]+[@]+[A-Za-z0-9]+[\.]+[A-Za-z]+$/);
        

        // Set error message strings for each field
        const errMess_empty = "Le champ est vide !"

        const errMess_firstName = "Prénom invalide !";
        const errMess_lastName = "Nom de famille invalide !";
        const errMess_address = "Adresse postale invalide !"
        const errMess_city = "Les chiffres ne sont pas autorisés !"
        const errMess_email = "Adresse e-mail invalide !"

        this.formValidation(firstName, firstNameRegEx, errMess_empty, errMess_firstName);
        this.formValidation(lastName, lastNameRegEx, errMess_empty, errMess_lastName);
        this.formValidation(address, adressRegEx, errMess_empty, errMess_address);
        this.formValidation(city, lastNameRegEx, errMess_empty, errMess_city);
        this.formValidation(email, emailRegEx, errMess_empty, errMess_email);

        return contactData;
    }

    // Check input fields informations 
    formValidation(inputField, regEx, errMessEmpty, errMessField) {
        
        if (inputField.value === "") {
            this.popUpMessage(inputField, errMessEmpty);
        }

        else if (!regEx.test(inputField.value)) {
            this.popUpMessage(inputField, errMessField);
        }
    }

    // Pop error message up if wrong data entered
    popUpMessage(inputField, message) {

        const messageHtml = `<p class="flexCenter error-message">${message}</p>`;
        const messageContainer = inputField.parentElement;

        if (!messageContainer.children[2]) {

            messageContainer.insertAdjacentHTML("beforeend", messageHtml);
            setTimeout(() => messageContainer.children[2].remove(), 3000);
        }
    }
}


const setCartClass = () => {

    const cart = new CartClass (
        this.items
    );

    return cart
}


const cart = setCartClass();