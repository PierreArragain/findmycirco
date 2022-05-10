const {
    findCirco
} = require("../modules/checkPoint");
const {
    findMyMp,
    presidentialResults
} = require("../modules/mpAndResultsFinder");

const circoController = {
    resultPage: async (req, res) => {
        try {
        const query = req.query;

        // Récupération de la circonscription à partir de l'adresse saisie.
        const result = await findCirco(res, query);

        // Récupération du / de la députée correspondante
        const myMP = findMyMp(result.numDpt, result.numCirco);

        // Récupération des résultats aux dernières présidentielles 
        const presResults = presidentialResults(result.numDpt, result.numCirco);
        return res.render("results", {
            address: {
                firstline : result.address.name,
                secondline: `${result.address.postcode} ${result.address.city}`
            },
            numCirco: result.numCirco,
            numDpt: result.numDpt,
            myMp: myMP,
            presidentialResults: presResults
        });
    } catch (error) {
        console.error(error);
    }
    
    }
}

module.exports = circoController;