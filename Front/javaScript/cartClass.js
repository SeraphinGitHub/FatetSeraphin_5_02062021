
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
    // Get Teddy object by Id inside CartArray
    // ======================================================================
    getTeddyById(cartArray, targetId) {
        const elementMatchId = element => element._id === targetId;
        const teddyIndex = cartArray.findIndex(elementMatchId);
        return cartArray[teddyIndex];
    }

    // ======================================================================
    // Manage "Add to Cart" button
    // ======================================================================
    addItem(teddy, inputClass) {
        
        const cartArray = this.getItems();
        
        const resetValue = 1;        
        let quantityValue = Number (inputClass.value);
        let teddyQtyObject = teddy.quantity;
        let currentColor = teddy.selectedColor;
        let teddyById = cart.getTeddyById(cartArray, teddy._id);
        
        if (!teddyById) {

            teddyQtyObject[currentColor] = Number (quantityValue), 654;
            cartArray.push(teddy);
        }
        
        else {
            if (!Object.keys(teddyById.quantity).includes(currentColor)) {
                teddyById.quantity[currentColor] = Number (quantityValue);
            }

            else teddyById.quantity[currentColor] += Number (quantityValue);
            teddyById.selectedColor = currentColor;
        }
        
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
        inputClass.value = resetValue;  // After adding item to cart => restore input field to 1
        quantityValue = resetValue;  // Restore "+ / -" buttons values to 1
        this.updateTotalQty();  // Update number of items in the cart
    }


    // ======================================================================
    // Render Items in Cart
    // ======================================================================
    renderItems(creatCartItem) {
        
        const cartArray = this.getItems();
        
        // For each teddy in cart
        cartArray.forEach(item => {
            
            const teddy = setTeddy(item); // Get Teddy data from localStorage
            const teddyQtyObject = item.quantity;

            for (const [teddyColor, teddyQty] of Object.entries(teddyQtyObject)) {
                if(teddyQty) creatCartItem(teddy, teddyColor, teddyQty);
            }
        });
    }


    // ======================================================================
    // Control buttons " + / - " per item in Cart Page
    // ======================================================================
    cartQuantityBtn(event, symbol) {

        const cartArray = cart.getItems();
        const getTargetId = event.target.parentElement.parentElement.id;
        const quantityInput = event.target.parentElement.querySelector(".quantity-input");
        const teddyColor = event.target.parentElement.parentElement.querySelector(".selected-color").textContent;
        let teddyQtyObject = cart.getTeddyById(cartArray, getTargetId).quantity;
        const minValue = Number (quantityInput.min);

        if (symbol === "+") {
            teddyQtyObject[teddyColor] ++;
        }
        
        if (quantityInput.value > minValue && symbol === "-") {
            teddyQtyObject[teddyColor] --;
        }
        
        quantityInput.value = teddyQtyObject[teddyColor];
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
        cart.updateTotalQty();  // Update number of items in the cart
        cart.updateTotalPrice();  // Update total price in the cart
    }


    // ======================================================================
    // Remove item from Cart
    // ======================================================================
    removeItem(event) {

        const cartArray = cart.getItems(); // Get data from localStorage        
        const teddyColor = event.target.parentElement.querySelector(".selected-color").textContent;
        const getTargetId = event.target.parentElement.id; // Get main <div> Id of cliked element
        const elementMatchId = element => element._id === getTargetId;
        const teddyIndex = cartArray.findIndex(elementMatchId);

        let teddyById = cartArray[teddyIndex];
        let teddyQtyObject = teddyById.quantity;

        delete teddyQtyObject[teddyColor];
        localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the hole thing into LS

        event.target.parentElement.classList.add("translateY_-100");  // Move <div> up before remove              
        cart.updateTotalQty();  // Update number of items in the cart
        cart.updateTotalPrice();  // Update total price in the cart

        setTimeout(() => {
            event.target.parentElement.parentElement.remove();  // Totally remove the html content after delay
            
            // If last this Teddy by color is remove
            if(!Object.keys(teddyQtyObject).length) {
                cartArray.splice(teddyIndex, 1); // Delete "Teddy object" at this index
                localStorage.setItem("cartArray", JSON.stringify(cartArray)); 
            }
        }, 400);
    }


    // ======================================================================
    // Calculate item's total "quantity" or "price"
    // ======================================================================
    calculateTotal(cartArray, total, valueType) {

        // If cartArray exist in localStorage
        if (localStorage.getItem("cartArray") !== null) {

            // For each Teddy in cart Array (LocalStorage)
            cartArray.forEach(item => {

                const teddyPrice = item.price;
                const teddyQtyObject = item.quantity;
                let qtyItems = 0;
                
                // For each qty per color add qty value to "qtyItems"
                for (let value in teddyQtyObject) {
                    qtyItems += teddyQtyObject[value];
                }
                
                // Add up every Teddy's quantity in cart
                if (valueType === "quantity") total += qtyItems;

                // Add up every Teddy's quantity in cart & multiply by Teddy's price value
                if (valueType === "price") total += qtyItems * teddyPrice;
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
        return this.calculateTotal(cartArray, totalQtyAll, "quantity");
    }


    // ======================================================================
    // Update cart's total price 
    // ======================================================================
    updateTotalPrice() {

        const cartArray = this.getItems();
        const totalPrice = 0;

        // Turn the total price value into a currency (Cart Page)
        return new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(this.calculateTotal(cartArray, totalPrice, "price")/100);
    }
    

    // ======================================================================
    // Purchase command
    // ======================================================================
    async purchase(event) {
        
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
        
        if(products.length) {
            const command = await postData_API(contact, products);
            if(command.orderId) localStorage.setItem("orderId", command.orderId);
        }
    }
    
    
    // ======================================================================
    // Confirm form page and order command
    // ======================================================================
    getCustomerInfos() {

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
        
        // Get input fields by ID
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const email = document.getElementById("email");
        const contact = document.querySelector(".contact");
        let contactData = new FormData(contact);
        
        // Set error message strings for each field
        const errMess_empty = "Le champ est vide !";

        const errMess_firstName = "Prénom invalide !";
        const errMess_lastName = "Nom de famille invalide !";
        const errMess_address = "Adresse postale invalide !";
        const errMess_city = "Les chiffres ne sont pas autorisés !";
        const errMess_email = "Adresse e-mail invalide !";

        this.formValidation(contactData, firstName, firstNameRegEx, errMess_empty, errMess_firstName);
        this.formValidation(contactData, lastName, lastNameRegEx, errMess_empty, errMess_lastName);
        this.formValidation(contactData, address, adressRegEx, errMess_empty, errMess_address);
        this.formValidation(contactData, city, lastNameRegEx, errMess_empty, errMess_city);
        this.formValidation(contactData, email, emailRegEx, errMess_empty, errMess_email);

        return contactData;
    }

    // Check input fields informations 
    formValidation(contactData, inputField, regEx, errMessEmpty, errMessField) {

        // // If input field is empty
        // if (inputField.value === "") {
        //     this.popUpMessage(inputField, errMessEmpty); // Pop error message up
        // }

        // // If regEx is wrong
        // else if (!regEx.test(inputField.value)) {
        //     this.popUpMessage(inputField, errMessField); // Pop error message up
        //     contactData.set(inputField.name, ""); // Set contactData pairs "key: value" to "input field's name: empty"
        // }
        
        // // If all informations are corrects
        // else {
        //     // Set contactData pairs "key: value" to "input field's name: inputField.value"
        //     contactData.set(inputField.name, inputField.value);
        // }


        contactData.set(inputField.name, "aze");
        
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