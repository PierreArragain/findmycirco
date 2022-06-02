const inside = require('point-in-geopolygon');
const { getCoordinates } = require('./coordinateCalculator');

const circos = require('../data/circonscriptions-legislatives.json');

const checkPoint = {
    // Trouver une circonscription en fonction de l'adresse
    /**
     * 
     * 
     * @param {string} address 
     * @returns Un objet circo contenant le numéro du département et le numéro de la circonscription correspondant à l'adresse recherchée.
     */
    findCirco : async (res, address) => {
        
        try {
            // Récupération des coordonnées GPS liées à l'adresse
            const point = await getCoordinates(res, address);
            
            // Recherche du point GPS dans le geojson des circos
            const result = inside.feature(circos, point);
            // Récupération du numéro du département et de la circonscription.
            const circo = {
                numDpt: result.properties.REF.split('-')[0],
                numCirco: result.properties.REF.split('-')[1]
            }
            return circo;
        } catch (err) {
            console.log(err)
        }
        
    }
}

module.exports = checkPoint;



