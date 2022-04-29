const geocoder = require('geocoder-fr');

const coordinateCalculator = {
    getCoordinates: async (address) => {

        const result = await geocoder.geocodeBestResult(address);

        const coordinates = [result.long, result.lat]

        console.log(coordinates);
        return coordinates;
    }
}

module.exports = coordinateCalculator;