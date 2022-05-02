const errorController = require("./errorController");
const {
    findCirco
} = require("../modules/checkPoint");
const { findMyMp, presidentialResults } = require("../modules/mpFinder")
const mainController = {
    homePage: (req, res) => {
        res.render('home');
    },

    findCirco: async (req, res) => {
        const query = req.query;
        const searchedAddress = `${query.streetNumber} ${query.streetName} ${query.zip} ${query.townName}`

        const result = await findCirco(searchedAddress);

        const myMP = findMyMp(result.numDpt, result.numCirco);

        const presResults = presidentialResults(result.numDpt, result.numCirco);
        res.render("results", {
            result: result,
            myMp : myMP,
            presidentialResults : presResults
        });
    }
}


module.exports = mainController;