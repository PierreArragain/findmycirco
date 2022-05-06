const { application } = require('express');
const geocoder = require('geocoder-fr');

const coordinateCalculator = {
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