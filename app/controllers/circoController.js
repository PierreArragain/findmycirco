const {
    findCirco
} = require("../modules/checkPoint");
const {
    findMyMp,
    presidentialResults
} = require("../modules/mpAndResultsFinder");

const circoController = {
    findCirco: async (req, res) => {
        const query = req.query;
        const searchedAddress = `${query.streetNumber} ${query.streetName} ${query.zip} ${query.townName}`
        // Récupération de la circonscription à partir de l'adresse saisie.
        const result = await findCirco(searchedAddress);
        // Récupération du / de la députée correspondante
        const myMP = findMyMp(result.numDpt, result.numCirco);
        // Récupération des résultats aux dernières présidentielles 
        const presResults = presidentialResults(result.numDpt, result.numCirco);
        console.log(presResults.firstRoundResults.exprimes["Fabien Roussel"]);
        return res.render("results", {
            result: result,
            myMp: myMP,
            presidentialResults: presResults
        });
    }
}

module.exports = circoController;