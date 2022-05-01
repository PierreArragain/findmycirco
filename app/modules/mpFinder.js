const data = require('../data/liste-deputes.json');
const formerData = require('../data/liste_anciens_deputes.json');

const mpFinder = {


    findMyMp: (numDpt, numCirco) => {
        let myMP;
        for (const depute of data.deputes) {
            if (parseInt(depute.depute.num_deptmt, 10) === parseInt(numDpt, 10) && parseInt(depute.depute.num_circo, 10) === parseInt(numCirco, 10)) {
                const urlImg = "https://www.nosdeputes.fr/depute/photo" + depute.depute.url_nosdeputes.split('.fr')[1] + "/100";
                myMP = {
                    dpt: depute.depute.nom_circo,
                    numCirc: depute.depute.num_circo,
                    lastname: depute.depute.nom_de_famille,
                    firstname: depute.depute.prenom,
                    gender: depute.depute.sexe,
                    url_nosdeputes: depute.depute.url_nosdeputes,
                    url_img: urlImg,
                    party: depute.depute.parti_ratt_financier,
                    mandat: 'Mandat en cours'
                }
                return myMP;
            }

        }
        if (myMP === undefined) {
            for (const depute of formerData.deputes) {
                if (parseInt(depute.depute.num_deptmt, 10) === parseInt(numDpt, 10) && parseInt(depute.depute.num_circo, 10) === parseInt(numCirco, 10)) {
                    const urlImg = "https://www.nosdeputes.fr/depute/photo" + depute.depute.url_nosdeputes.split('.fr')[1] + "/100";
                    myMP = {
                        dpt: depute.depute.nom_circo,
                        numCirc: depute.depute.num_circo,
                        lastname: depute.depute.nom_de_famille,
                        firstname: depute.depute.prenom,
                        gender: depute.depute.sexe,
                        url_nosdeputes: depute.depute.url_nosdeputes,
                        url_img: urlImg,
                        party: depute.depute.parti_ratt_financier,
                        mandat: 'Mandat terminé le ' + new Date(depute.depute.mandat_fin).toLocaleDateString("fr")
                    }
                    return myMP;
                }
            }
        }
    }
}

module.exports = mpFinder;