const {
    findCirco
} = require("../modules/checkPoint");
const {
    findMyMp,
    presidentialResults
} = require("../modules/mpAndResultsFinder");
const { getCandidates } = require('../modules/candidates');

const circoController = {
    /**
     * 
     * @returns la page de résultat à partir de l'adresse saisie par l'utilisateur
     */
    resultPage: async (req, res) => {
        try {
        const query = req.query;

        // Récupération de la circonscription à partir de l'adresse saisie.
        const result = await findCirco(res, query);

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
                firstline : result.address.name,
                secondline: `${result.address.postcode} ${result.address.city}`
            },
            numCirco: result.numCirco,
            numDpt: result.numDpt,
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