const data = require('../data/liste-deputes.json');
const formerData = require('../data/liste_anciens_deputes.json');
const firstRoundData = require('../data/resultats-par-circo-t1.json');
const secondRoundData = require('../data/resultats-par-circo-t2.json');

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
    },
    presidentialResults: (numDpt, numCirco) => {
        let firstRoundResults;
        let secondRoundResults;
        for (const circo of firstRoundData) {
            if(parseInt(circo.dpt_num, 10) === parseInt(numDpt, 10) && parseInt(circo.circo_num, 10) === parseInt(numCirco, 10)) {
                firstRoundResults = {
                    votants: {
                    "abstention": circo.abstention,
                    "votants": circo.votants
                    },
                    bulletin: {
                    "Bulletins blancs": circo.score_blanc,
                    "Bulletins nuls": circo.score_nul
                    },
                    exprimes: {
                        "Nathalie Arthaud": circo.score_arthaud,
                        "Fabien Roussel": circo.score_roussel,
                        "Emmanuel Macron": circo.score_macron,
                        "Jean Lassalle": circo.score_lassalle,
                        "Marine Le Pen": circo.score_lepen,
                        "Eric Zemmour": circo.score_zemmour,
                        "Jean-Luc Mélenchon": circo.score_melenchon,
                        "Anne Hidalgo": circo.score_hidalgo,
                        "Yannick Jadot": circo.score_jadot,
                        "Valérie Pécresse": circo.score_pecresse,
                        "Philippe Poutou": circo.score_poutou,
                        "Nicolas Dupont-Aignan": circo.score_dupontaignan
                    }   
                }
            }
        }
        for (const circo of secondRoundData) {
            if(parseInt(circo.dpt_num, 10) === parseInt(numDpt, 10) && parseInt(circo.circo_num, 10) === parseInt(numCirco, 10)) {
                secondRoundResults = {
                    votants: {
                    "abstention": circo.abstention,
                    "votants": circo.votants
                    },
                    bulletin: {
                    "Bulletins blancs": circo.score_blanc,
                    "Bulletins nuls": circo.score_nul
                    },
                    exprimes: {
                        "Emmanuel Macron": circo.score_macron,
                        "Marine Le Pen": circo.score_lepen
                    }
                }
            }
        }
        return { firstRoundResults , secondRoundResults };
    }
}

module.exports = mpFinder;