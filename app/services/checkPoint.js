const inside = require('point-in-geopolygon');
const { getCoordinates }= require('./coordinateCalculator');

const circos = require('../data/france-circonscriptions-legislatives-2012.json');

const checkPoint = {
    findCirco : async (address) => {
        try {
            const point = await getCoordinates(address);
            const result = [inside.feature(circos, point)];
            return result;
        } catch (err) {
            console.log(err)
        }
        
    }
}

module.exports = checkPoint;



