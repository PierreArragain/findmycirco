const geocoder = require('geocoder-fr');

const coordinateCalculator = {
    getCoordinates: async (address) => {
        try {
        const result = await geocoder.geocodeBestResult(address);

        const coordinates = [result.long, result.lat]

        console.log(coordinates);
        return coordinates;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = coordinateCalculator;