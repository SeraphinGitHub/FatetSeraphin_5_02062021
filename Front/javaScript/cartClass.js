
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
    // Manage "Add to Cart" button
    // ======================================================================
    addItem(teddy, inputClass) {
        
        const cartArray = this.getItems();
        const elementMatchId = element => element._id === teddy._id;
        
        const resetValue = 1;        
        let quantityValue = Number (inputClass.value);
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

        inputClass.value = resetValue;  // After adding item to cart => restore input field to 1
        quantityValue = resetValue;  // Restore "+ / -" buttons values to 1
        this.updateTotalQty();  // Update number of items in the cart
    }


    // ======================================================================
    // Render Items in Cart
    // ======================================================================
    renderItems(creatCartItem) {
        
        // ****************************************************************
        // ****************************************************************

        const cartArray = this.getItems();
        
        // For each teddy in cart
        cartArray.forEach(item => {
            
            const teddy = setTeddy(item); // Get Teddy data from localStorage

            
            
            // const teddyQty = item.quantity[value]; //Get Teddy quantity


            
            let teddyColor = teddy.selectedColor;
            
            const qtyObj = item.quantity;
            let teddyQty = 0;
            
            // For each qty per color
            for (let value in qtyObj) {
                
                teddyQty = qtyObj[value]; // Get color qty value

                // If qty value is not null
                if(teddyQty) {
                    creatCartItem(teddy, teddyQty, teddyColor); // Render item in cart
                }
            }
            
            // ****************************************************************
            // ****************************************************************

        });
    }


    // ======================================================================
    // Control buttons " + / - " per item in Cart Page
    // ======================================================================
    cartQuantityBtn(event, symbol) {

        // ****************************************************************
        // ****************************************************************
        
        const cartArray = cart.getItems();

        const getParent = event.target.parentElement;
        const getTargetId = getParent.parentElement.id;
        const quantityInput = getParent.querySelector(".quantity-input");
        
        const elementMatchId = element => element._id === getTargetId;
        const teddyIndex = cartArray.findIndex(elementMatchId);
   

        const minValue = Number (quantityInput.min);
        

        let quantityValue = Number (quantityInput.value);
        let teddyQtyObj = cartArray[teddyIndex].quantity;
        let currentColor = cartArray[teddyIndex].selectedColor;


        if (symbol === "+") {
            // qtyArray_indexOne ++;

            teddyQtyObj[currentColor] = (teddyQtyObj[currentColor] + Number (quantityValue));
        }
        
        if (quantityInput.value > minValue && symbol === "-") {
            // qtyArray_indexOne --;

            teddyQtyObj[currentColor] = (teddyQtyObj[currentColor] - Number (quantityValue));
        }
        
        quantityInput.value = teddyQtyObj[currentColor];
        // cartArray[teddyIndex].quantity.splice(0, 1, qtyArray_indexOne);
        localStorage.setItem("cartArray", JSON.stringify(cartArray));

        // ****************************************************************
        // ****************************************************************
        
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
                const qtyObj = item.quantity;
                let qtyItems = 0;
                
                // For each qty per color add qty value to "qtyItems"
                for (let value in qtyObj) {
                    qtyItems += qtyObj[value];
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
        
        // else {
        //     const emptyCartAlert = document.querySelector(".cart-empty-alert"); 
        //     popAlertMessage(emptyCartAlert);
        // }
    }
    
    
    // ======================================================================
    // Confirm form page and order command
    // ======================================================================
    getCustomerInfos() {

        // Get input fields by ID
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const email = document.getElementById("email");

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
        const errMess_empty = "Le champ est vide !";

        const errMess_firstName = "Prénom invalide !";
        const errMess_lastName = "Nom de famille invalide !";
        const errMess_address = "Adresse postale invalide !";
        const errMess_city = "Les chiffres ne sont pas autorisés !";
        const errMess_email = "Adresse e-mail invalide !";

        const contact = document.querySelector(".contact");
        let contactData = new FormData(contact);
        
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