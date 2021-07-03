
"use strict"

// ======================================================================
// Class Cart "Items in cart"
// ======================================================================
class CartClass {

    constructor () {
        this.items = JSON.parse(localStorage.getItem("cartArray")) || [];
    }


    // ======================================================================
    // Get data from "cartArray" in localStorage
    // ======================================================================
    getItems() {
        return this.items;
    }


    // ======================================================================
    // Get Teddy object by Id inside CartArray
    // ======================================================================
    getTeddyById(cartArray, targetId) {
        const teddyIndex = cartArray.findIndex((element) => element._id === targetId);
        return cartArray[teddyIndex];
    }

    // ======================================================================
    // Manage "Add to Cart" button
    // ======================================================================
    addItem(teddy, inputClass) {

        const cartArray = this.getItems();
        const resetValue = 1;        
        let quantityValue = Number (inputClass.value); // Input field value
        let teddyQtyObject = teddy.quantity; //Get current teddy's quantity array
        let currentColor = teddy.selectedColor; //Get current teddy's color
        let teddyById = cart.getTeddyById(cartArray, teddy._id);  //Get current teddy in cartArray by it's Id 
        
        // If no teddy with this Id in localStorage
        if (!teddyById) {
            teddyQtyObject[currentColor] = Number (quantityValue); // Set color & quantity of teddy
            cartArray.push(teddy); // Add this teddy to cartArray
        }

        // If teddy with this Id exist in localStorage but not with current color
        else if (!Object.keys(teddyById.quantity).includes(currentColor)) {
            
            // Get stored teddy by Id & set the new color & quantity to this teddy
            teddyById.quantity[currentColor] = Number (quantityValue);
        }

        // If teddy with this Id & with the same color exist in localStorage
        else {

            // Get stored teddy by Id & just add the new quantity to this teddy
            teddyById.quantity[currentColor] += Number (quantityValue);
            teddyById.selectedColor = currentColor;
        }
        
        localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the modified "cartArray" in LS
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
            const teddyQtyObject = item.quantity; //Get current teddy's quantity array

            // If this Teddy's quantity isn't null ==> Render one Teddy for each pair [Color: quantity]
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

        // Get the Id, the quantity field & the color of the clicked item
        const getTargetId = event.target.parentElement.parentElement.id;
        const quantityInput = event.target.parentElement.querySelector(".quantity-input");
        const teddyColor = event.target.parentElement.parentElement.querySelector(".selected-color").textContent;
        let teddyQtyObject = cart.getTeddyById(cartArray, getTargetId).quantity; // Get stored Teddy's quantity array
        const minValue = Number (quantityInput.min);

        // If plus button
        if (symbol === "+") {
            teddyQtyObject[teddyColor] ++;
        }
        
        // If minus button & value isn't under minumum set value in html attribute
        if (quantityInput.value > minValue && symbol === "-") {
            teddyQtyObject[teddyColor] --;
        }
        
        quantityInput.value = teddyQtyObject[teddyColor]; // Set the new qty in input field
        localStorage.setItem("cartArray", JSON.stringify(cartArray)); // Store the modified "cartArray" in LS
        cart.updateTotalQty();  // Update number of items in the cart
        cart.updateTotalPrice();  // Update total price in the cart
    }


    // ======================================================================
    // Remove item from Cart
    // ======================================================================
    removeItem(event) {

        const cartArray = cart.getItems(); // Get data from localStorage   
        
        // Get the Id & the color of the clicked item
        const getTargetId = event.target.parentElement.id;
        const teddyColor = event.target.parentElement.querySelector(".selected-color").textContent;
        
        // Get Teddy by Id in CartArray
        const teddyIndex = cartArray.findIndex((element) => element._id === getTargetId); 
        let teddyById = cartArray[teddyIndex];
        let teddyQtyObject = teddyById.quantity;

        delete teddyQtyObject[teddyColor]; // Delete this Teddy's pair [color: quantity]
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
        return new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(this.calculateTotal(cartArray, totalPrice, "price")/100); // Turn the total price value into a currency (Cart Page)
    }
    

    // ======================================================================
    // Purchase command
    // ======================================================================
    async purchase(event) {
        
        event.preventDefault();
        const contact = this.getCustomerInfos(); // Get infos from customer (after RegEx)
        const cartArray = this.getItems(); // Get cartArray from lS
        const products = [];

        cartArray.forEach(item => products.push(item._id)); // Set products array with only cart item's Id
        contact.forEach((key, value) => contact[value] = key); // Set contact object with customer's infos
        
        // If cart isn't empty
        if(products.length) {
            
            // Send request to the API with format data
            const command = await postData_API(contact, products);
            
            // If request success ==> store the received order Id
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

        // If input field is empty
        if (inputField.value === "") {
            this.popUpMessage(inputField, errMessEmpty); // Pop error message up
        }

        // If regEx is wrong
        else if (!regEx.test(inputField.value)) {
            this.popUpMessage(inputField, errMessField); // Pop error message up
            contactData.set(inputField.name, ""); // Set contactData pairs "key: value" to "input field's name: empty"
        }
        
        // If all informations are corrects
        else {
            // Set contactData pairs "key: value" to "input field's name: inputField.value"
            contactData.set(inputField.name, inputField.value);
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