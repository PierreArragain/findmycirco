const fetch = require('node-fetch');

const requestAddress = {

    requestAddress: async (request) => {
        const address = `${request.streetnumber} ${request.streetname} ${request.townzip} ${request.townname}`;
        console.log(address);
        try {
            const response = await fetch('https://api-adresse.data.gouv.fr/search/?q=' + address);
            const data = await response.json();
            const result = {
                long: data.features[0].geometry.coordinates[0],
                lat: data.features[0].geometry.coordinates[1],
                name: data.features[0].properties.name,
                postcode: data.features[0].properties.postcode,
                city: data.features[0].properties.city
            }
            return result;
        } catch (err){
            console.error(err);
        }
    }
}


module.exports = requestAddress;