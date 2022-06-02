const { application } = require('express');
const geocoder = require('geocoder-fr');

const coordinateCalculator = {
    /**
     * 
     * @param {*} address 
     * @returns un array contenant les coordonnées GPS correspondant à l'adresse saisie.
     */
    getCoordinates: async (res, address) => {
        try {
        const result = await geocoder.geocodeBestResult(address);
        if (result) {
        const coordinates = [result.long, result.lat]
        return coordinates;
        } else {
            res.render('home', { error: "address"});
        }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = coordinateCalculator;