
"use strict"

// ======================================================================
// Class Teddy "Item properties"
// ======================================================================
class TeddyClass {

    constructor (
        id, 
        name,
        price,
        imageUrl, 
        description,
        selectedColor, 
        colors) {

        this._id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.quantity = {};
        this.selectedColor = selectedColor;
        this.colors = colors;
    }

    priceFormated() {
        // Turn API's price number value into a currency price
        return new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(this.price/100);
    }
}


const setTeddy = (data) => {

    let teddy = new TeddyClass (

        data._id,
        data.name,
        data.price,
        data.imageUrl,
        data.description,
        data.selectedColor,
        data.colors
    );

    return teddy
}


const teddyClass_WithAPI = async (getId) => {
    
    const teddyJson = await getTeddyData_API(getId);
    const teddy = setTeddy(teddyJson);
    return teddy;
}