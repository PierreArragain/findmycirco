const data = require('../data/liste-deputes.json');
const formerData = require('../data/liste_anciens_deputes.json');
const firstRoundData = require('../data/resultats-par-circo-t1.json');
const secondRoundData = require('../data/resultats-par-circo-t2.json');

const mpAndResultsFinder = {


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
        //On transforme la donnée en nombre
        const getNumberFromString  = (string) => {
            if (typeof string === "string") {
            let number = string.split(',');
            number = Number(number.join('.'));
            return number;
            } else {
                return string;
            }

        }

        for (const circo of firstRoundData) {
            if (parseInt(circo.dpt_num, 10) === parseInt(numDpt, 10) && parseInt(circo.circo_num, 10) === parseInt(numCirco, 10)) {
                firstRoundResults = {
                    votants: {
                        "abstention": getNumberFromString(circo.abstention),
                        "votants": getNumberFromString(circo.votants)
                    },
                    bulletin: {
                        "Bulletins blancs": getNumberFromString(circo.score_blanc),
                        "Bulletins nuls": getNumberFromString(circo.score_nul)
                    },
                    exprimes: {
                        "Nathalie Arthaud": {
                            result: getNumberFromString(circo.score_arthaud),
                            color: "#AC5857"
                        }, 
                        "Fabien Roussel": {
                            result: getNumberFromString(circo.score_roussel),
                            color: "#DE302C"
                        },
                        "Emmanuel Macron": {
                            result: getNumberFromString(circo.score_macron),
                            color: "#F3A13D"
                        },
                        "Jean Lassalle": {
                            result: getNumberFromString(circo.score_lassalle),
                            color: "#667A75"
                        },
                        "Marine Le Pen": {
                            result: getNumberFromString(circo.score_lepen),
                            color: "#866131"
                        },
                        "Eric Zemmour": {
                            result: getNumberFromString(circo.score_zemmour),
                            color: "#604521"
                        },
                        "Jean-Luc Mélenchon": {
                            result: getNumberFromString(circo.score_melenchon),
                            color: "#EC483F"
                        },
                        "Anne Hidalgo": 
                        {
                            result: getNumberFromString(circo.score_hidalgo),
                            color: "#ED708C"
                        },
                        "Yannick Jadot": 
                        {
                            result: getNumberFromString(circo.score_jadot),
                            color: "#58B34E"
                        },
                        "Valérie Pécresse": {
                            result: getNumberFromString(circo.score_pecresse),
                            color: "#3E8FC0"
                        },
                        "Philippe Poutou": {
                            result: getNumberFromString(circo.score_poutou),
                            color: "#BE3A32"
                        },
                        "Nicolas Dupont-Aignan": {
                            result: getNumberFromString(circo.score_dupontaignan),
                            color: "#052C96"
                        }
                    }
                }
            }
        }
        for (const circo of secondRoundData) {
            if (parseInt(circo.dpt_num, 10) === parseInt(numDpt, 10) && parseInt(circo.circo_num, 10) === parseInt(numCirco, 10)) {
                secondRoundResults = {
                    votants: {
                        "abstention": getNumberFromString(circo.abstention),
                        "votants": getNumberFromString(circo.votants)
                    },
                    bulletin: {
                        "Bulletins blancs": getNumberFromString(circo.score_blanc),
                        "Bulletins nuls": getNumberFromString(circo.score_nul)
                    },
                    exprimes: {
                        "Emmanuel Macron": {
                            result: getNumberFromString(circo.score_macron),
                            color: "#F3A13D"
                        },
                        "Marine Le Pen": {
                            result: getNumberFromString(circo.score_lepen),
                            color: "#866131",
                        }
                    }
                }
            }
        }
        return {
            firstRoundResults,
            secondRoundResults
        };
    }
}

module.exports = mpAndResultsFinder;