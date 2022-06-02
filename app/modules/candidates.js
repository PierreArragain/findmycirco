const data = require('../data/candidats.json');

const candidates = {
    /**
     * 
     * @param {number} codeDpt 
     * @param {number} codeCirco 
     * @returns Un array contenant les candidats dans la circonscription correspondant.
     */
    getCandidates: (codeDpt, codeCirco) => {
        const searchedCirco = `${codeDpt}-${codeCirco}`; 
        let candidates = [];
        for (const candidate of data) {
            candidate.sortant = false;
            if(candidate.circonscription === searchedCirco) {
               candidates.push(candidate);
            }
        }
        return candidates;

       
    }
}

module.exports = candidates;