
"use strict"

// ======================================================================
//  GET route API - Main
// ======================================================================
// fetch("./jsonAPI/teddy.json")  ==>  When put project on GitHub Page

const getAllData_API = async () => {
    return await fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(jsonData => {return jsonData});
}


// ======================================================================
//  GET route API - Item ID
// ======================================================================
// fetch(`./jsonAPI/teddy.json/${itemID}`)  ==>  When put project on GitHub Page

const getTeddyData_API = async (itemID) => {
    return await fetch(`http://localhost:3000/api/teddies/${itemID}`)
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