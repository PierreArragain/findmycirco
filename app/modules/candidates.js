const data = require('../data/candidats.json');

const candidates = {
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