const {
    findCirco
} = require("../modules/checkPoint");
const {
    findMyMp,
    presidentialResults
} = require("../modules/mpAndResultsFinder");
const { getCandidates } = require('../modules/candidates');

const circoController = {
    resultPage: async (req, res) => {
        try {
        const query = req.query;
        const wayInfo = `${query.streetnumber} ${query.streetname}`;
        const townInfo = `${query.townzip} ${query.townname}`
        const searchedAddress = `${wayInfo} ${townInfo}`
        // Récupération de la circonscription à partir de l'adresse saisie.
        const result = await findCirco(res, searchedAddress);

        // Récupération du / de la députée correspondante
        const myMP = findMyMp(result.numDpt, result.numCirco);

        // Récupération des résultats aux dernières présidentielles 
        const presResults = presidentialResults(result.numDpt, result.numCirco);
        const candidates = getCandidates(result.numDpt, result.numCirco);
        for (const candidate of candidates) {
           
            if(candidate.nom.toLocaleLowerCase() === myMP.lastname.toLocaleLowerCase() && candidate.prenom.toLocaleLowerCase() === myMP.firstname.toLocaleLowerCase()) {
                candidate.sortant = true;
            }
        }
        return res.render("results", {
            address: {
                firstline : wayInfo,
                secondline: townInfo
            },
            result: result,
            myMp: myMP,
            presidentialResults: presResults,
            candidates: candidates
        });
    } catch (error) {
        console.error(error);
    }
    
    }
}

module.exports = circoController;