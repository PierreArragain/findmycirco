const { requestAddress } = require('../api/reqAddress');

const coordinateCalculator = {
    getCoordinatesAndAddress: async (res, address) => {
        try {
        const result = await requestAddress(address);
        if (result) {
        return result;
        } else {
            res.render('home', { error: "address"});
        }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = coordinateCalculator;