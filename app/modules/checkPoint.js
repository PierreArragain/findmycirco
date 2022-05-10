const inside = require('point-in-geopolygon');
const { getCoordinatesAndAddress } = require('./coordinateCalculator');

const circos = require('../data/circonscriptions-legislatives.json');

const checkPoint = {
    // Trouver une circonscription en fonction de l'adresse
    findCirco : async (res, address) => {
        
        try {
            // Récupération des coordonnées GPS liées à l'adresse
            const data = await getCoordinatesAndAddress(res, address);
            const coordinates = [data.long, data.lat];
            // Recherche du point GPS dans le geojson des circos
            const result = inside.feature(circos, coordinates);
            // Récupération du numéro du département et de la circonscription.
            const circoAndAddress = {
                numDpt: result.properties.REF.split('-')[0],
                numCirco: result.properties.REF.split('-')[1],
                address: {
                    name: data.name,
                    postcode: data.postcode,
                    city: data.city
                }
            }
            return circoAndAddress;
        } catch (err) {
            console.log(err)
        }
        
    }
}

module.exports = checkPoint;



