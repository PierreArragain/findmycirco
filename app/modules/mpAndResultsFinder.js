const data = require('../data/liste-deputes.json');
const formerData = require('../data/liste_anciens_deputes.json');
const firstRoundData = require('../data/resultats-par-circo-t1.json');
const secondRoundData = require('../data/resultats-par-circo-t2.json');

const mpAndResultsFinder = {

/**
 * 
 * @param {number} numDpt 
 * @param {number} numCirco 
 * @returns un objet contenant les informations correspondant en place jusqu'à la date des élections. S'il n'y a plus de député pour la circonscription à cette date, il retourne le dernier député en place.
 */
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
    /**
     * 
     * @param {number} numDpt 
     * @param {number} numCirco 
     * @returns Deux objets : 
     * - firstRoundResults contient les résultats au premier tour de l'élection présidentielle 
     * - secondRoundResults contient les résultats au premier tour de l'élection présidentielle 
     */
    presidentialResults: (numDpt, numCirco) => {
        let firstRoundResults;
        let secondRoundResults;
        //On transforme la donnée en nombre
        const getNumberFromString = (string) => {
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
                    votants: [
                        ["abstention", getNumberFromString(circo.abs)],
                        ["votants", getNumberFromString(circo.vot)]
                    ],
                    bulletins: [
                        ["Bulletins blancs", getNumberFromString(circo.score_blanc)],
                        ["Bulletins nuls", getNumberFromString(circo.score_nul)]
                    ],
                    exprimes: [
                        ["Nathalie Arthaud", getNumberFromString(circo.score_arthaud), "#AC5857"],
                        ["Fabien Roussel", getNumberFromString(circo.score_roussel), "#DE302C"],
                        ["Emmanuel Macron", getNumberFromString(circo.score_macron), "#F3A13D"],
                        ["Jean Lassalle", getNumberFromString(circo.score_lassalle), "#667A75"],
                        ["Marine Le Pen", getNumberFromString(circo.score_lepen), "#866131"],
                        ["Eric Zemmour", getNumberFromString(circo.score_zemmour), "#604521"],
                        ["Jean-Luc Mélenchon", getNumberFromString(circo.score_melenchon), "#EC483F"],
                        ["Anne Hidalgo", getNumberFromString(circo.score_hidalgo), "#ED708C"],
                        ["Yannick Jadot", getNumberFromString(circo.score_jadot), "#58B34E"],
                        ["Valérie Pécresse", getNumberFromString(circo.score_pecresse), "#3E8FC0"],
                        ["Philippe Poutou", getNumberFromString(circo.score_poutou), "#BE3A32"],
                        ["Nicolas Dupont-Aignan", getNumberFromString(circo.score_dupontaignan), "#052C96"]
                    ]
                }
            }
        }
        firstRoundResults.exprimes.sort(function (a, b) {
            return b[1] - a[1];
        })
        
        for (const circo of secondRoundData) {
            if (parseInt(circo.dpt_num, 10) === parseInt(numDpt, 10) && parseInt(circo.circo_num, 10) === parseInt(numCirco, 10)) {
                secondRoundResults = {
                    votants: [
                        ["abstention", getNumberFromString(circo.abs)],
                        ["votants", getNumberFromString(circo.vot)]
                    ],
                    bulletins: [
                        ["Bulletins blancs", getNumberFromString(circo.score_blanc)],
                        ["Bulletins nuls", getNumberFromString(circo.score_nul)]
                    ],
                    exprimes: [
                        ["Emmanuel Macron", getNumberFromString(circo.score_macron), "#F3A13D"],
                        ["Marine Le Pen", getNumberFromString(circo.score_lepen), "#866131"]
                    ]
                }
            }
        }
        secondRoundResults.exprimes.sort(function (a, b) {
            return b[1] - a[1];
        })

        return {
            firstRoundResults,
            secondRoundResults
        };
    }
}

module.exports = mpAndResultsFinder;