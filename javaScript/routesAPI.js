
"use strict"

// ======================================================================
//  GET route API - Main
// ======================================================================
// const getMainData_API = () => await fetch("./jsonAPI/teddy.json")  ==>  When put project on GitHub Page

const getMainData_API = async () => {
    return await fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(jsonData => {return jsonData});
}


// ======================================================================
//  GET route API - Item ID
// ======================================================================
// const getItemIdData_API = () => await fetch(`./jsonAPI/teddy.json/${itemID}`)  ==>  When put project on GitHub Page

const getItemIdData_API = async (itemID) => {
    await fetch(`http://localhost:3000/api/teddies/${itemID}`)
    .then(response => response.json())
    .then(jsonData => {return jsonData});
}


// ======================================================================
//  POST route API - Order
// ======================================================================
const postData_API = async (contact, products) => {

    const response = await fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",  

        body: JSON.stringify({contact, products})


        // body: JSON.stringify(
            // contact: {
            //     *   firstName: string,
            //     *   lastName: string,
            //     *   address: string,
            //     *   city: string,
            //     *   email: string
            //     * }

            //     * products: [string]
        // ) 
    });
    
    try {
        const newData = await response.json();
        
        console.log(newData);
        
        return newData;
    }
    
    catch(error) {
        console.log("error", error);
    }
}