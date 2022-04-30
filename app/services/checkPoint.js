const inside = require('point-in-geopolygon');
const { getCoordinates } = require('./coordinateCalculator');

const circos = require('../data/france-circonscriptions-legislatives-2012.json');

const checkPoint = {
    findCirco : async (address) => {
        
        try {
            const point = await getCoordinates(address);
            return inside.feature(circos, point);
            
        } catch (err) {
            console.log(err)
        }
        
    }
}

module.exports = checkPoint;



